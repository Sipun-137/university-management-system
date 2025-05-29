/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  MoreHorizontal,
  UserCheck,
  UserX,
  FileEdit,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAllStudents } from "@/services/StudentService/StudentService"

interface StudentListProps {
  filter: "all" | "ACTIVE" | "GRADUATED" | "SUSPENDED" | "ON_LEAVE"
  searchQuery: string
  filters: {
    batch: string
    branch: string
    section: string
    semester: string
    status: string
    gender: string
  }
  onStudentSelect: (studentId: string) => void
  selectedStudentId: string | null
}

export function StudentList({ filter, searchQuery, filters, onStudentSelect, selectedStudentId }: StudentListProps) {
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const [students,setStudents]=useState<any []>([]);

  // Filter students based on criteria
  const filterStudents = () => {
    let filteredStudents = [...students]

    // Apply tab filter (status)
    if (filter !== "all") {
      filteredStudents = filteredStudents.filter((student) => student.academicStatus === filter)
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredStudents = filteredStudents.filter(
        (student) =>
          student.name.toLowerCase().includes(query) ||
          student.email.toLowerCase().includes(query) ||
          student.regdNo.toLowerCase().includes(query) ||
          student.rollNo.toLowerCase().includes(query),
      )
    }

  

    // Apply batch filter
    if (filters.batch !== "all") {
      filteredStudents = filteredStudents.filter((student) => student.batch.name === filters.batch)
    }

    // Apply branch filter
    if (filters.branch !== "all") {
      filteredStudents = filteredStudents.filter((student) => student.branch.name === filters.branch)
    }

    // Apply section filter
    if (filters.section !== "all") {
      filteredStudents = filteredStudents.filter((student) => student.section.name === filters.section)
    }

    // Apply semester filter
    if (filters.semester !== "all") {
      filteredStudents = filteredStudents.filter((student) => student.currentSemester.name === filters.semester)
    }

    // Apply status filter
    if (filters.status !== "all") {
      filteredStudents = filteredStudents.filter((student) => student.academicStatus === filters.status)
    }

    // Apply gender filter
    if (filters.gender !== "all") {
      filteredStudents = filteredStudents.filter((student) => student.gender === filters.gender)
    }

    // Apply sorting
    if (sortField) {
      filteredStudents.sort((a, b) => {
        let aValue, bValue

        // Handle nested properties
        if (sortField === "branch") {
          aValue = a.branch.name
          bValue = b.branch.name
        } else if (sortField === "batch") {
          aValue = a.batch.name
          bValue = b.batch.name
        } else if (sortField === "section") {
          aValue = a.section.name
          bValue = b.section.name
        } else if (sortField === "currentSemester") {
          aValue = a.currentSemester.name
          bValue = b.currentSemester.name
        } else {
          aValue = a[sortField as keyof typeof a]
          bValue = b[sortField as keyof typeof b]
        }

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        } else {
          return sortDirection === "asc" ? (aValue > bValue ? 1 : -1) : bValue > aValue ? 1 : -1
        }
      })
    }

    return filteredStudents
  }

    async function loadStudents()
    {
      const studentsList=await getAllStudents();
      setStudents(studentsList);
    }

    useEffect(()=>{
      loadStudents();
    },[])

  const filteredStudents = filterStudents()

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ChevronsUpDown className="ml-2 h-4 w-4" />
    }
    return sortDirection === "asc" ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Badge className="bg-green-500">Active</Badge>
      case "GRADUATED":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Graduated
          </Badge>
        )
      case "SUSPENDED":
        return <Badge variant="destructive">Suspended</Badge>
      case "ON_LEAVE":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            On Leave
          </Badge>
        )
      case "PENDING_SECTION_ASSIGNMENT":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            Pending Section Assignment
          </Badge>
        )
      default:
        return null
    }
  }



  return (
    <Card>
      <CardHeader>
        <CardTitle>Students</CardTitle>
        <CardDescription>{filteredStudents.length} students found</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("name")}>
                  Name {getSortIcon("name")}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("regdNo")}>
                  Regd. No {getSortIcon("regdNo")}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("branch")}>
                  Branch {getSortIcon("branch")}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("batch")}>
                  Batch {getSortIcon("batch")}
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedStudents.length > 0 ? (
              paginatedStudents.map((student) => (
                <TableRow
                  key={student.id}
                  className={selectedStudentId === student.id ? "bg-muted/50" : undefined}
                  onClick={() => onStudentSelect(student.id)}
                >
                  <TableCell>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={student.profilePhotoUrl || "/placeholder.svg"} alt={student.name} />
                      <AvatarFallback>
                        {student.name
                          .split(" ")
                          .map((n: any[]) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.regdNo}</TableCell>
                  <TableCell>{student.branch.name}</TableCell>
                  <TableCell>{student.batch.startYear}</TableCell>
                  <TableCell>{getStatusBadge(student.academicStatus)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <FileEdit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        {student.academicStatus === "ACTIVE" ? (
                          <DropdownMenuItem>
                            <UserX className="mr-2 h-4 w-4" />
                            Suspend
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Activate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      {totalPages > 1 && (
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length} students
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

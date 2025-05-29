"use client"

import { useState } from "react"
import { MoreHorizontal, Edit, Trash, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FacultyDetails } from "./faculty-details"

interface FacultyListProps {
  faculty: any[]
}

export function FacultyList({ faculty }: FacultyListProps) {
  const [selectedFaculty, setSelectedFaculty] = useState<any | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const handleViewDetails = (faculty: any) => {
    setSelectedFaculty(faculty)
    setIsDetailsOpen(true)
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faculty.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24">
                    No faculty members found
                  </TableCell>
                </TableRow>
              ) : (
                faculty.map((faculty) => (
                  <TableRow key={faculty.id}>
                    <TableCell className="font-medium">{faculty.name}</TableCell>
                    <TableCell>{faculty.employeeId}</TableCell>
                    <TableCell>{faculty.email}</TableCell>
                    <TableCell>{faculty.phone}</TableCell>
                    <TableCell>
                      {faculty.designation === "PROFESSOR" && "Professor"}
                      {faculty.designation === "ASSOCIATE_PROFESSOR" && "Associate Professor"}
                      {faculty.designation === "ASSISTANT_PROFESSOR" && "Assistant Professor"}
                    </TableCell>
                    <TableCell>{faculty.department.name}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(faculty)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedFaculty && (
        <FacultyDetails faculty={selectedFaculty} open={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} />
      )}
    </>
  )
}

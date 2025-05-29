/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AddBranchDialog } from "@/components/academic/dialogs/add-branch-dialog"
import { EditBranchDialog } from "@/components/academic/dialogs/edit-branch-dialog"
import { DeleteConfirmationDialog } from "@/components/academic/dialogs/delete-confirmation-dialog"
import { AddBranch, DeleteBranch, GetAllBranch, updateBranch } from "@/services/AcademicService/BranchService"
import { GetCourseData } from "@/services/AcademicService/CourseService"


interface BranchManagementProps {
  onRefresh: () => void
}


interface branchI{
  id:number,
  name:string
}

export function BranchManagement({ onRefresh }: BranchManagementProps) {
  const [courses,setCourses]=useState([]);
  const [branches, setBranches] = useState([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState<branchI | null>(null)

  const handleAddBranch = async (branch: any) => {
    // In a real application, this would be an API call
    const addResponse=await AddBranch(branch);
    console.log(addResponse);
    loadBranches();
    setIsAddDialogOpen(false)
    onRefresh()
  }

  const handleEditBranch = async (branch: any) => {
    // In a real application, this would be an API call
    const updatedBranches=await updateBranch(branch.id,branch);
    console.log(updatedBranches);
    loadBranches();
    setIsEditDialogOpen(false)
    onRefresh()
  }

  const handleDeleteBranch = async() => {
    // In a real application, this would be an API call
    if (selectedBranch) {
      const result=await DeleteBranch(selectedBranch.id);
      console.log(result);
      loadBranches();
      setIsDeleteDialogOpen(false)
      setSelectedBranch(null)
      onRefresh()
    }
  }

  async function loadBranches() {
    const branchData=await GetAllBranch();
    console.log(branchData);
    setBranches(branchData);
  }

  async function LoadCourses(){
    const courseData=await GetCourseData();
    setCourses(courseData);
  }

  useEffect(()=>{
    loadBranches();
    LoadCourses();
  },[])

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Branches</CardTitle>
            <CardDescription>Manage branches for different courses.</CardDescription>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Branch
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Semesters</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches.length > 0 ? (
                branches.map((branch:any) => (
                  <TableRow key={branch.id}>
                    <TableCell className="font-medium">{branch.name}</TableCell>
                    <TableCell>{branch.course.name}</TableCell>
                    <TableCell>{branch.semesters.length}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedBranch(branch)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => {
                              setSelectedBranch(branch)
                              setIsDeleteDialogOpen(true)
                            }}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No branches found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddBranchDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddBranch}
        courses={courses}
      />

      {selectedBranch && (
        <EditBranchDialog
          open={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false)
            setSelectedBranch(null)
          }}
          onSave={handleEditBranch}
          branch={selectedBranch}
          courses={courses}
        />
      )}

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false)
          setSelectedBranch(null)
        }}
        onDelete={handleDeleteBranch}
        title="Delete Branch"
        description={`Are you sure you want to delete the ${selectedBranch?.name} branch? This action cannot be undone.`}
      />
    </>
  )
}

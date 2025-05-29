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
import { AddSubjectDialog } from "@/components/academic/dialogs/add-subject-dialog"
import { EditSubjectDialog } from "@/components/academic/dialogs/edit-subject-dialog"
import { DeleteConfirmationDialog } from "@/components/academic/dialogs/delete-confirmation-dialog"
import { getAllSemesters } from "@/services/AcademicService/SemesterService"
import { AddSubject, deleteSubject, getAllSubjects, updateSubject } from "@/services/AcademicService/SubjectService"


interface SubjectManagementProps {
  onRefresh: () => void
}

export function SubjectManagement({ onRefresh }: SubjectManagementProps) {
  const [semesters,setSemesters]=useState([]);
  const [subjects, setSubjects] = useState([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<any | null>(null)

  const handleAddSubject = async (subject: any) => {
    // In a real application, this would be an API call
    const newSubject = await AddSubject(subject);
    console.log(newSubject);
    loadSubjects();
    setIsAddDialogOpen(false)
    onRefresh()
  }

  const handleEditSubject = async (subject: any) => {
    // In a real application, this would be an API call
    const updatedSubject = await updateSubject(subject.id,subject);
    console.log(updatedSubject);
    loadSubjects();
    setIsEditDialogOpen(false)
    onRefresh()
  }

  const handleDeleteSubject = async () => {
    // In a real application, this would be an API call
    if (selectedSubject) {
      const deletedSubject=await deleteSubject(selectedSubject.id);
      console.log(deletedSubject);
      loadSubjects();
      setIsDeleteDialogOpen(false)
      setSelectedSubject(null)
      onRefresh()
    }
  }

  async function LoadSemesters(){
    const semesterList=await getAllSemesters();
    console.log(semesterList);
    setSemesters(semesterList);
  }


  async function loadSubjects(){
    const subjectList=await getAllSubjects();
    console.log(subjectList);
    setSubjects(subjectList);
  }


  useEffect(()=>{
    loadSubjects();
    LoadSemesters();
  },[])

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Subjects</CardTitle>
            <CardDescription>Manage subjects for different semesters and branches.</CardDescription>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Subject
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Course</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.length > 0 ? (
                subjects.map((subject:{id:number;subjectCode:string;name:string;credits:number;semester:{id:number,number:number;branch:{id:number,name:string,course:{id:number,name:string}|null}}}) => (
                  <TableRow key={subject.id}>
                    <TableCell className="font-medium">{subject.subjectCode}</TableCell>
                    <TableCell>{subject.name}</TableCell>
                    <TableCell>{subject.credits}</TableCell>
                    <TableCell>{subject.semester.number}</TableCell>
                    <TableCell>{subject.semester.branch.name}</TableCell>
                    <TableCell>{subject.semester.branch.course?.name}</TableCell>
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
                              setSelectedSubject(subject)
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
                              setSelectedSubject(subject)
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
                  <TableCell colSpan={7} className="h-24 text-center">
                    No subjects found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddSubjectDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddSubject}
        semesters={semesters}
      />

      {selectedSubject && (
        <EditSubjectDialog
          open={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false)
            setSelectedSubject(null)
          }}
          onSave={handleEditSubject}
          subject={selectedSubject}
          semesters={semesters}
        />
      )}

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false)
          setSelectedSubject(null)
        }}
        onDelete={handleDeleteSubject}
        title="Delete Subject"
        description={`Are you sure you want to delete ${selectedSubject?.name} (${selectedSubject?.subjectCode})? This action cannot be undone.`}
      />
    </>
  )
}

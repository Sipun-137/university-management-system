/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddCourseDialog } from "@/components/academic/dialogs/add-course-dialog";
import { EditCourseDialog } from "@/components/academic/dialogs/edit-course-dialog";
import { DeleteConfirmationDialog } from "@/components/academic/dialogs/delete-confirmation-dialog";
import { AddCourse, DeleteCourse, GetCourseData, UpdateCourse } from "@/services/AcademicService/CourseService";


interface CourseManagementProps {
  onRefresh: () => void;
}

export function CourseManagement({ onRefresh }: CourseManagementProps) {
  const [courses, setCourses] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

  const handleAddCourse = async (course: any) => {
    // In a real application, this would be an API call
    const response = await AddCourse(course);
    if (response.success) {
      
    }
    setIsAddDialogOpen(false);
    onRefresh();
  };

  const handleEditCourse =async (course: any) => {
    // In a real application, this would be an API call
    const updateresponse=await UpdateCourse(course.id,course);
    console.log(updateresponse);
    setIsEditDialogOpen(false);
    onRefresh();
  };

  const handleDeleteCourse = async() => {
    // In a real application, this would be an API call
    if (selectedCourse) {
      const delRes=await DeleteCourse(selectedCourse.id);
      console.log(delRes);
      setIsDeleteDialogOpen(false);
      setSelectedCourse(null);
      onRefresh();
    }
  };

  useEffect(() => {
    async function getdata() {
      const data = await GetCourseData();
      console.log(data);
      setCourses(data);
    }
    getdata();
  },[]);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Courses</CardTitle>
            <CardDescription>
              Manage university courses and their details.
            </CardDescription>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Duration (Years)</TableHead>
                <TableHead>Branches</TableHead>
                <TableHead>Batches</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.length > 0 ? (
                courses.map((course:any) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.name}</TableCell>
                    <TableCell>{course.durationInYears}</TableCell>
                    <TableCell>{course.branchIds.length}</TableCell>
                    <TableCell>{course.batchIds.length}</TableCell>
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
                              setSelectedCourse(course);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => {
                              setSelectedCourse(course);
                              setIsDeleteDialogOpen(true);
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
                  <TableCell colSpan={5} className="h-24 text-center">
                    No courses found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddCourseDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddCourse}
      />

      {selectedCourse && (
        <EditCourseDialog
          open={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedCourse(null);
          }}
          onSave={handleEditCourse}
          course={selectedCourse}
        />
      )}

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedCourse(null);
        }}
        onDelete={handleDeleteCourse}
        title="Delete Course"
        description={`Are you sure you want to delete the course "${selectedCourse?.name}"? This action cannot be undone.`}
      />
    </>
  );
}

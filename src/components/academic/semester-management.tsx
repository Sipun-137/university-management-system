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
import { AddSemesterDialog } from "@/components/academic/dialogs/add-semester-dialog";
import { EditSemesterDialog } from "@/components/academic/dialogs/edit-semester-dialog";
import { DeleteConfirmationDialog } from "@/components/academic/dialogs/delete-confirmation-dialog";
import {
  AddSemester,
  deleteSemester,
  getAllSemesters,
  updateSemester,
} from "@/services/AcademicService/SemesterService";
import { GetAllBranch } from "@/services/AcademicService/BranchService";


interface SemesterManagementProps {
  onRefresh: () => void;
}

export function SemesterManagement({ onRefresh }: SemesterManagementProps) {
  const [semesters, setSemesters] = useState([]);
  const [branches, setBranches] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<any | null>(null);

  const handleAddSemester = async (semester: any) => {
    // In a real application, this would be an API call
    const addedSemester = await AddSemester(semester);
    console.log(addedSemester);
    LoadSemesters();

    setIsAddDialogOpen(false);
    onRefresh();
  };

  const handleEditSemester = async (semester: any) => {
    // In a real application, this would be an API call
    const updatedSemester = await updateSemester(semester.id,semester);
    console.log(updatedSemester)
    LoadSemesters();
    setIsEditDialogOpen(false);
    onRefresh();
  };

  const handleDeleteSemester =async  () => {
    // In a real application, this would be an API call
    if (selectedSemester) {
      const deletedSemester=await deleteSemester(selectedSemester.id) ;
      console.log(deletedSemester);
      LoadSemesters();
      setIsDeleteDialogOpen(false);
      setSelectedSemester(null);
      onRefresh();
    }
  };

  async function LoadSemesters() {
    const semesterData = await getAllSemesters();
    setSemesters(semesterData);
  }

  async function LoadBranches() {
    const branchesData = await GetAllBranch();
    setBranches(branchesData);
  }

  useEffect(() => {
    LoadBranches();
    LoadSemesters();
  }, []);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Semesters</CardTitle>
            <CardDescription>
              Manage semesters for different branches and courses.
            </CardDescription>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Semester
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Semester</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {semesters.length > 0 ? (
                semesters.map((semester:any) => (
                  <TableRow key={semester.id}>
                    <TableCell className="font-medium">
                      {semester.number}
                    </TableCell>
                    <TableCell>{semester.branch.name}</TableCell>
                    <TableCell>{semester.branch.course.name}</TableCell>
                    <TableCell>{semester.subjectIds.length}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          semester.current
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {semester.current ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
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
                              setSelectedSemester(semester);
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
                              setSelectedSemester(semester);
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
                  <TableCell colSpan={6} className="h-24 text-center">
                    No semesters found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddSemesterDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddSemester}
        branches={branches}
      />

      {selectedSemester && (
        <EditSemesterDialog
          open={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedSemester(null);
          }}
          onSave={handleEditSemester}
          semester={selectedSemester}
          branches={branches}
        />
      )}

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedSemester(null);
        }}
        onDelete={handleDeleteSemester}
        title="Delete Semester"
        description={`Are you sure you want to delete Semester ${selectedSemester?.number} of ${selectedSemester?.branch} (${selectedSemester?.course})? This action cannot be undone.`}
      />
    </>
  );
}

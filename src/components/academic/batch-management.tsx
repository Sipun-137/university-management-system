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
import { AddBatchDialog } from "@/components/academic/dialogs/add-batch-dialog";
import { EditBatchDialog } from "@/components/academic/dialogs/edit-batch-dialog";
import { DeleteConfirmationDialog } from "@/components/academic/dialogs/delete-confirmation-dialog";
import { GetCourseData } from "@/services/AcademicService/CourseService";
import { AddBatch, deleteBatch, getAllBatches, updateBatch } from "@/services/AcademicService/BatchService";
import toast, { Toaster } from "react-hot-toast";



interface BatchManagementProps {
  onRefresh: () => void;
}

export function BatchManagement({ onRefresh }: BatchManagementProps) {
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<any | null>(null);

  const handleAddBatch = async (batch: any) => {
    // In a real application, this would be an API call
    const response = await AddBatch(batch);
    console.log(response);
    loadBatches();
    toast.success("successfully batch added");
    setIsAddDialogOpen(false);
    onRefresh();
  };

  const handleEditBatch = async (batch: any) => {
    // In a real application, this would be an API call
    const updatedBatch=await updateBatch(batch.id,batch);
    console.log(updatedBatch);
    loadBatches();
    setIsEditDialogOpen(false);
    onRefresh();
  };

  const handleDeleteBatch = async() => {
    // In a real application, this would be an API call
    if (selectedBatch) {
      const deletedBatch=await deleteBatch(selectedBatch.id);
      console.log(deletedBatch)
      loadBatches();
      setIsDeleteDialogOpen(false);
      setSelectedBatch(null);
      onRefresh();
    }
  };

  async function LoadCourse() {
    const data = await GetCourseData();
    setCourses(data);
  }

  async function loadBatches() {
    const batchesdata=await getAllBatches();
    setBatches(batchesdata);
  }

  useEffect(() => {
    loadBatches();
    LoadCourse();
  }, []);

  return (
    <>
      <Toaster position="bottom-right" />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Batches</CardTitle>
            <CardDescription>
              Manage student batches for different courses.
            </CardDescription>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Batch
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Start Year</TableHead>
                <TableHead>End Year</TableHead>
                <TableHead>Sections</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batches.length > 0 ? (
                batches.map((batch:any) => (
                  <TableRow key={batch.id}>
                    <TableCell className="font-medium">
                      {batch.course.name}
                    </TableCell>
                    <TableCell>{batch.startYear}</TableCell>
                    <TableCell>{batch.endYear}</TableCell>
                    <TableCell>{batch.sections.length}</TableCell>
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
                              setSelectedBatch(batch);
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
                              setSelectedBatch(batch);
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
                    No batches found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddBatchDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddBatch}
        courses={courses}
      />

      {selectedBatch && (
        <EditBatchDialog
          open={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedBatch(null);
          }}
          onSave={handleEditBatch}
          batch={selectedBatch}
          courses={courses}
        />
      )}

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedBatch(null);
        }}
        onDelete={handleDeleteBatch}
        title="Delete Batch"
        description={`Are you sure you want to delete the ${selectedBatch?.course} batch (${selectedBatch?.startYear}-${selectedBatch?.endYear})? This action cannot be undone.`}
      />
    </>
  );
}

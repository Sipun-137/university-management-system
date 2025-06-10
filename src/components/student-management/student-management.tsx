/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { PlusCircle, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentList } from "@/components/student-management/student-list";
import { StudentDetails } from "@/components/student-management/student-details";
import { StudentFilters } from "@/components/student-management/student-filters";
import { AddStudentDialog } from "@/components/student-management/add-student-dialog";
import { AddStudent } from "@/services/StudentService/StudentService";


export function StudentManagement() {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    batch: "all",
    branch: "all",
    section: "all",
    semester: "all",
    status: "all",
    gender: "all",
  });

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudent(studentId);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleAddStudent = () => {
    setIsAddStudentDialogOpen(true);
  };


  const handleStudentAdded = async (student: any) => {
    const addedStudent = await AddStudent(student);
    console.log(addedStudent);

    setIsAddStudentDialogOpen(false);
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Student Management
          </h1>
          <p className="text-muted-foreground">
            View and manage student records, academic information, and personal
            details
          </p>
        </div>
        <Button onClick={handleAddStudent}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Students</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="graduated">Graduated</TabsTrigger>
            <TabsTrigger value="suspended">Suspended</TabsTrigger>
            <TabsTrigger value="on_leave">On Leave</TabsTrigger>
          </TabsList>

          <div className="mt-4 flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            <StudentFilters
              onSearchChange={handleSearchChange}
              onFilterChange={handleFilterChange}
              filters={filters}
              showFilters={showFilters}
            />

            <Button
              variant="outline"
              size="sm"
              className="md:ml-auto"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <TabsContent value="all" className="mt-0">
                <StudentList
                  filter="all"
                  searchQuery={searchQuery}
                  filters={filters}
                  onStudentSelect={handleStudentSelect}
                  selectedStudentId={selectedStudent}
                />
              </TabsContent>
              <TabsContent value="active" className="mt-0">
                <StudentList
                  filter="ACTIVE"
                  searchQuery={searchQuery}
                  filters={filters}
                  onStudentSelect={handleStudentSelect}
                  selectedStudentId={selectedStudent}
                />
              </TabsContent>
              <TabsContent value="graduated" className="mt-0">
                <StudentList
                  filter="GRADUATED"
                  searchQuery={searchQuery}
                  filters={filters}
                  onStudentSelect={handleStudentSelect}
                  selectedStudentId={selectedStudent}
                />
              </TabsContent>
              <TabsContent value="suspended" className="mt-0">
                <StudentList
                  filter="SUSPENDED"
                  searchQuery={searchQuery}
                  filters={filters}
                  onStudentSelect={handleStudentSelect}
                  selectedStudentId={selectedStudent}
                />
              </TabsContent>
              <TabsContent value="on_leave" className="mt-0">
                <StudentList
                  filter="ON_LEAVE"
                  searchQuery={searchQuery}
                  filters={filters}
                  onStudentSelect={handleStudentSelect}
                  selectedStudentId={selectedStudent}
                />
              </TabsContent>
            </div>
            <div>
              <StudentDetails
                studentId={
                  selectedStudent !== null ? Number(selectedStudent) : null
                }  
              />
            </div>
          </div>
        </Tabs>
      </div>

      <AddStudentDialog
        open={isAddStudentDialogOpen}
        onClose={() => setIsAddStudentDialogOpen(false)}
        onStudentAdded={handleStudentAdded}
      />

      
    </div>
  );
}

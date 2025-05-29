/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback, useEffect } from "react";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FacultyList } from "./faculty-list";
import { FacultyFilters } from "./faculty-filters";
import { AddFacultyDialog } from "./add-faculty-dialog";
import {
  AddFaculty,
  getAllFaculties,
} from "@/services/FacultyService/FacultyService";

// Mock faculty data based on the updated schema
// const mockFaculty = [
//   {
//     id: 1,
//     name: "Dr. John Smith",
//     email: "john.smith@university.edu",
//     employeeId: "FAC001",
//     phone: "9876543210",
//     designation: "PROFESSOR",
//     department: { id: 1, name: "Computer Science" },
//     address: "123 University Ave, City",
//     bloodGroup: "O+",
//     nationality: "Indian",
//     emergencyContact: "9876543211",
//     gender: "MALE",
//     dob: "1975-05-15",
//   },
//   {
//     id: 2,
//     name: "Dr. Sarah Johnson",
//     email: "sarah.johnson@university.edu",
//     employeeId: "FAC002",
//     phone: "9876543211",
//     designation: "ASSOCIATE_PROFESSOR",
//     department: { id: 1, name: "Computer Science" },
//     address: "456 College St, City",
//     bloodGroup: "A+",
//     nationality: "Indian",
//     emergencyContact: "9876543212",
//     gender: "FEMALE",
//     dob: "1980-08-22",
//   },
//   {
//     id: 3,
//     name: "Prof. Michael Chen",
//     email: "michael.chen@university.edu",
//     employeeId: "FAC003",
//     phone: "9876543212",
//     designation: "ASSISTANT_PROFESSOR",
//     department: { id: 2, name: "Electrical Engineering" },
//     address: "789 Campus Rd, City",
//     bloodGroup: "B+",
//     nationality: "Indian",
//     emergencyContact: "9876543213",
//     gender: "MALE",
//     dob: "1985-03-10",
//   },
//   {
//     id: 4,
//     name: "Dr. Emily Rodriguez",
//     email: "emily.rodriguez@university.edu",
//     employeeId: "FAC004",
//     phone: "9876543213",
//     designation: "PROFESSOR",
//     department: { id: 3, name: "Mechanical Engineering" },
//     address: "101 Faculty Housing, City",
//     bloodGroup: "AB+",
//     nationality: "Indian",
//     emergencyContact: "9876543214",
//     gender: "FEMALE",
//     dob: "1978-11-30",
//   },
//   {
//     id: 5,
//     name: "Prof. David Wilson",
//     email: "david.wilson@university.edu",
//     employeeId: "FAC005",
//     phone: "9876543214",
//     designation: "ASSOCIATE_PROFESSOR",
//     department: { id: 4, name: "Civil Engineering" },
//     address: "202 Professor Lane, City",
//     bloodGroup: "O-",
//     nationality: "Indian",
//     emergencyContact: "9876543215",
//     gender: "MALE",
//     dob: "1982-07-18",
//   },
// ];

export function FacultyManagement() {
  const [faculty, setFaculty] = useState<any[]>([]);
  const [filteredFaculty, setFilteredFaculty] = useState<any[]>([]);
  const [isAddFacultyDialogOpen, setIsAddFacultyDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Use useCallback to memoize the filter function
  const handleFilter = useCallback(
    (filtered: any[]) => {
      // Apply tab-based filtering here instead of in the FacultyFilters component
      if (activeTab === "professors") {
        filtered = filtered.filter((f) => f.designation === "PROFESSOR");
      } else if (activeTab === "associate") {
        filtered = filtered.filter(
          (f) => f.designation === "ASSOCIATE_PROFESSOR"
        );
      } else if (activeTab === "assistant") {
        filtered = filtered.filter(
          (f) => f.designation === "ASSISTANT_PROFESSOR"
        );
      }

      setFilteredFaculty(filtered);
    },
    [activeTab]
  );

  const handleFacultyAdded = async (faculty: any) => {
    // In a real application, this would fetch the updated list from the API
    const response = await AddFaculty(faculty);
    console.log(response);
    setIsAddFacultyDialogOpen(false);
    LoadFaculties();
  };

  async function LoadFaculties() {
    const facultydata = await getAllFaculties();
    setFaculty(facultydata);
  }

  useEffect(() => {
    LoadFaculties();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Faculty Management
        </h2>
        <Button onClick={() => setIsAddFacultyDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Faculty
        </Button>
      </div>

      <Tabs
        defaultValue="all"
        className="space-y-4"
        onValueChange={setActiveTab}
      >
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Faculty</TabsTrigger>
            <TabsTrigger value="professors">Professors</TabsTrigger>
            <TabsTrigger value="associate">Associate Professors</TabsTrigger>
            <TabsTrigger value="assistant">Assistant Professors</TabsTrigger>
          </TabsList>
        </div>

        <FacultyFilters
          faculty={faculty}
          onFilter={handleFilter}
          activeTab={activeTab}
        />

        <TabsContent value="all" className="space-y-4">
          <FacultyList faculty={filteredFaculty} />
        </TabsContent>

        <TabsContent value="professors" className="space-y-4">
          <FacultyList faculty={filteredFaculty} />
        </TabsContent>

        <TabsContent value="associate" className="space-y-4">
          <FacultyList faculty={filteredFaculty} />
        </TabsContent>

        <TabsContent value="assistant" className="space-y-4">
          <FacultyList faculty={filteredFaculty} />
        </TabsContent>
      </Tabs>

      <AddFacultyDialog
        open={isAddFacultyDialogOpen}
        onClose={() => setIsAddFacultyDialogOpen(false)}
        onFacultyAdded={handleFacultyAdded}
      />
    </div>
  );
}

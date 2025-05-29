/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { SubjectAssignmentList } from "./subject-assignment-list";
import { SubjectAssignmentFilters } from "./subject-assignment-filters";
import { AddSubjectAssignmentDialog } from "./add-subject-assignment-dialog";
import {
  AddSubjectAssignment,
  GetAllSubjectAssignements,
} from "@/services/SubjectAssignment/SubjectAssignment";
import { getAllSections } from "@/services/AcademicService/SectionService";
import { getAllSubjects } from "@/services/AcademicService/SubjectService";
import { getAllFaculties } from "@/services/FacultyService/FacultyService";

// Mock data matching the backend structure
const mockSubjectAssignments = [
  {
    id: 1,
    faculty: {
      id: 2,
      name: "Subhranshu Pradhan",
      email: "21cse345.subhranshupradhan@giet.edu",
      employeeId: "CSE001",
      designation: "ASSOCIATE_PROFESSOR",
      department: {
        id: 2,
        name: "Computer Science",
        course: {
          id: 1,
          name: "B.Tech",
        },
      },
      address: "angul odisha India 759127",
      bloodGroup: null,
      nationality: "INDIAN",
      emergencyContact: "9040238327",
      gender: "MALE",
      dob: "2000-08-15",
      phone: "8018840927",
    },
    section: {
      id: 4,
      name: "A",
      maxStrength: 60,
      currentStrength: 0,
    },
    subject: {
      id: 1,
      name: "Data Structures and Algorithm",
    },
    academicYear: "2024",
    term: "2024",
    weeklyHours: 4,
  },
  {
    id: 2,
    faculty: {
      id: 3,
      name: "Dr. Jane Smith",
      email: "jane.smith@giet.edu",
      employeeId: "CSE002",
      designation: "PROFESSOR",
      department: {
        id: 2,
        name: "Computer Science",
        course: {
          id: 1,
          name: "B.Tech",
        },
      },
      address: "Bhubaneswar, Odisha, India",
      bloodGroup: "O+",
      nationality: "INDIAN",
      emergencyContact: "9876543210",
      gender: "FEMALE",
      dob: "1985-03-20",
      phone: "9876543210",
    },
    section: {
      id: 5,
      name: "B",
      maxStrength: 60,
      currentStrength: 45,
    },
    subject: {
      id: 2,
      name: "Database Management Systems",
    },
    academicYear: "2024",
    term: "Fall",
    weeklyHours: 3,
  },
  {
    id: 3,
    faculty: {
      id: 4,
      name: "Prof. Robert Johnson",
      email: "robert.johnson@giet.edu",
      employeeId: "ECE001",
      designation: "ASSISTANT_PROFESSOR",
      department: {
        id: 3,
        name: "Electronics and Communication",
        course: {
          id: 1,
          name: "B.Tech",
        },
      },
      address: "Cuttack, Odisha, India",
      bloodGroup: "A+",
      nationality: "INDIAN",
      emergencyContact: "9123456789",
      gender: "MALE",
      dob: "1990-07-10",
      phone: "9123456789",
    },
    section: {
      id: 6,
      name: "A",
      maxStrength: 60,
      currentStrength: 50,
    },
    subject: {
      id: 3,
      name: "Digital Electronics",
    },
    academicYear: "2024",
    term: "Spring",
    weeklyHours: 4,
  },
];

// Mock data for dropdowns (you'll get these from separate API calls)
export const mockFaculties = [
  {
    id: 2,
    name: "Subhranshu Pradhan",
    employeeId: "CSE001",
    department: "Computer Science",
  },
  {
    id: 3,
    name: "Dr. Jane Smith",
    employeeId: "CSE002",
    department: "Computer Science",
  },
  {
    id: 4,
    name: "Prof. Robert Johnson",
    employeeId: "ECE001",
    department: "Electronics and Communication",
  },
];

export const mockSubjects = [
  { id: 1, name: "Data Structures and Algorithm" },
  { id: 2, name: "Database Management Systems" },
  { id: 3, name: "Digital Electronics" },
  { id: 4, name: "Operating Systems" },
  { id: 5, name: "Computer Networks" },
];

export const mockSections = [
  { id: 4, name: "A", maxStrength: 60, currentStrength: 0 },
  { id: 5, name: "B", maxStrength: 60, currentStrength: 45 },
  { id: 6, name: "A", maxStrength: 60, currentStrength: 50 },
  { id: 7, name: "C", maxStrength: 60, currentStrength: 30 },
];

export function SubjectAssignmentManagement() {
  const [assignments, setAssignments] = useState(mockSubjectAssignments);
  const [filteredAssignments, setFilteredAssignments] = useState(
    mockSubjectAssignments
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [sections, setSections] = useState([]);

  // Filter assignments based on search criteria
  const handleFilter = useCallback((filtered) => {
    setFilteredAssignments(filtered);
  }, []);

  // Add a new assignment
  const handleAddAssignment = async (newAsignment: any) => {
    setIsLoading(true);
    // Simulate API call
    const response = await AddSubjectAssignment(newAsignment);
    console.log(response);
    setTimeout(() => {
      loaadSubjectAssignments();
      setIsLoading(false);
      setIsAddDialogOpen(false);
    }, 1000);
  };

  // Edit an existing assignment
  const handleEditAssignment = (updatedAssignment: any) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const updatedAssignments = assignments.map((assignment) =>
        assignment.id === updatedAssignment.id ? updatedAssignment : assignment
      );
      setAssignments(updatedAssignments);
      setFilteredAssignments(updatedAssignments);
      setIsLoading(false);
    }, 1000);
  };

  // Delete an assignment
  const handleDeleteAssignment = (id: number) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const updatedAssignments = assignments.filter(
        (assignment) => assignment.id !== id
      );
      setAssignments(updatedAssignments);
      setFilteredAssignments(updatedAssignments);
      setIsLoading(false);
    }, 1000);
  };

  async function loaadSubjectAssignments() {
    const subjectAssignmentList = await GetAllSubjectAssignements();
    console.log(subjectAssignmentList);
    setAssignments(subjectAssignmentList);
  }

  async function loadSections() {
    const sectionList = await getAllSections();
    setSections(sectionList);
  }

  async function loadSubjects() {
    const subjectList = await getAllSubjects();
    setSubjects(subjectList);
  }

  async function loadfaculties() {
    const facultyList = await getAllFaculties();
    setFaculties(facultyList);
  }

  useEffect(() => {
    loaadSubjectAssignments();
    loadSections();
    loadSubjects();
    loadfaculties();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Subject Assignments</CardTitle>
          <CardDescription>
            Manage subject assignments to teachers
          </CardDescription>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Assignment
        </Button>
      </CardHeader>
      <CardContent>
        <SubjectAssignmentFilters
          assignments={assignments}
          onFilter={handleFilter}
        />
        <SubjectAssignmentList
          assignments={filteredAssignments}
          onEdit={handleEditAssignment}
          onDelete={handleDeleteAssignment}
          isLoading={isLoading}
        />
        <AddSubjectAssignmentDialog
          faculties={faculties}
          sections={sections}
          subjects={subjects}
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onAdd={handleAddAssignment}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}

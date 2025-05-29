"use client"

import { useState, useEffect, SetStateAction } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Faculty = {
  id: number
  name: string
  employeeId: string
  department: {
    name: string
  }
}

type Subject = {
  id: number
  name: string
}

type Section = {
  id: number
  name: string
}

type Assignment = {
  faculty: Faculty
  subject: Subject
  section: Section
  academicYear: string
  term: string
}

interface SubjectAssignmentFiltersProps {
  assignments: Assignment[]
  onFilter: (filtered: Assignment[]) => void
}

export function SubjectAssignmentFilters({ assignments, onFilter }: SubjectAssignmentFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFaculty, setSelectedFaculty] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedSection, setSelectedSection] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedTerm, setSelectedTerm] = useState("")

  // Extract unique values from assignments for filter options
  const faculties = [
    ...new Set(
      assignments.map((a) =>
        JSON.stringify({
          id: a.faculty.id,
          name: a.faculty.name,
          employeeId: a.faculty.employeeId,
        }),
      ),
    ),
  ].map((f) => JSON.parse(f))

  const subjects = [
    ...new Set(
      assignments.map((a) =>
        JSON.stringify({
          id: a.subject.id,
          name: a.subject.name,
        }),
      ),
    ),
  ].map((s) => JSON.parse(s))

  const sections = [
    ...new Set(
      assignments.map((a) =>
        JSON.stringify({
          id: a.section.id,
          name: a.section.name,
        }),
      ),
    ),
  ].map((s) => JSON.parse(s))

  const departments = [...new Set(assignments.map((a) => a.faculty.department.name))]
  const academicYears = [...new Set(assignments.map((a) => a.academicYear))].sort().reverse()
  const terms = [...new Set(assignments.map((a) => a.term))]

  // Filter assignments based on selected filters
  useEffect(() => {
    let filtered = [...assignments]

    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (a) =>
          a.faculty.name.toLowerCase().includes(search) ||
          a.faculty.employeeId.toLowerCase().includes(search) ||
          a.subject.name.toLowerCase().includes(search) ||
          a.faculty.department.name.toLowerCase().includes(search),
      )
    }

    // Only apply filter if a specific option is selected (not "all" or empty)
    if (selectedFaculty && selectedFaculty !== "all") {
      filtered = filtered.filter((a) => a.faculty.id === Number.parseInt(selectedFaculty))
    }

    if (selectedSubject && selectedSubject !== "all") {
      filtered = filtered.filter((a) => a.subject.id === Number.parseInt(selectedSubject))
    }

    if (selectedSection && selectedSection !== "all") {
      filtered = filtered.filter((a) => a.section.id === Number.parseInt(selectedSection))
    }

    if (selectedDepartment && selectedDepartment !== "all") {
      filtered = filtered.filter((a) => a.faculty.department.name === selectedDepartment)
    }

    if (selectedYear && selectedYear !== "all") {
      filtered = filtered.filter((a) => a.academicYear === selectedYear)
    }

    if (selectedTerm && selectedTerm !== "all") {
      filtered = filtered.filter((a) => a.term === selectedTerm)
    }

    onFilter(filtered)
  }, [
    assignments,
    searchTerm,
    selectedFaculty,
    selectedSubject,
    selectedSection,
    selectedDepartment,
    selectedYear,
    selectedTerm,
    onFilter,
  ])

  const handleReset = () => {
    setSearchTerm("")
    setSelectedFaculty("")
    setSelectedSubject("")
    setSelectedSection("")
    setSelectedDepartment("")
    setSelectedYear("")
    setSelectedTerm("")
  }

  // Handle select changes to clear filter when "all" is selected
  const handleFacultyChange = (value: SetStateAction<string>) => {
    setSelectedFaculty(value === "all" ? "" : value)
  }

  const handleSubjectChange = (value: SetStateAction<string>) => {
    setSelectedSubject(value === "all" ? "" : value)
  }

  const handleSectionChange = (value: SetStateAction<string>) => {
    setSelectedSection(value === "all" ? "" : value)
  }

  const handleDepartmentChange = (value: SetStateAction<string>) => {
    setSelectedDepartment(value === "all" ? "" : value)
  }

  const handleYearChange = (value: SetStateAction<string>) => {
    setSelectedYear(value === "all" ? "" : value)
  }

  const handleTermChange = (value: SetStateAction<string>) => {
    setSelectedTerm(value === "all" ? "" : value)
  }

  return (
    <div className="space-y-4 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search by faculty, employee ID, subject, or department"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="faculty">Faculty</Label>
          <Select value={selectedFaculty || "all"} onValueChange={handleFacultyChange}>
            <SelectTrigger id="faculty">
              <SelectValue placeholder="All Faculties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Faculties</SelectItem>
              {faculties.map((faculty) => (
                <SelectItem key={faculty.id} value={faculty.id.toString()}>
                  {faculty.name} ({faculty.employeeId})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Select value={selectedSubject || "all"} onValueChange={handleSubjectChange}>
            <SelectTrigger id="subject">
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map((subject) => (
                <SelectItem key={subject.id} value={subject.id.toString()}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="section">Section</Label>
          <Select value={selectedSection || "all"} onValueChange={handleSectionChange}>
            <SelectTrigger id="section">
              <SelectValue placeholder="All Sections" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sections</SelectItem>
              {sections.map((section) => (
                <SelectItem key={section.id} value={section.id.toString()}>
                  Section {section.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select value={selectedDepartment || "all"} onValueChange={handleDepartmentChange}>
            <SelectTrigger id="department">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((department) => (
                <SelectItem key={department} value={department}>
                  {department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Academic Year</Label>
          <Select value={selectedYear || "all"} onValueChange={handleYearChange}>
            <SelectTrigger id="year">
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {academicYears.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="term">Term</Label>
          <Select value={selectedTerm || "all"} onValueChange={handleTermChange}>
            <SelectTrigger id="term">
              <SelectValue placeholder="All Terms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Terms</SelectItem>
              {terms.map((term) => (
                <SelectItem key={term} value={term}>
                  {term}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {(searchTerm ||
        selectedFaculty ||
        selectedSubject ||
        selectedSection ||
        selectedDepartment ||
        selectedYear ||
        selectedTerm) && (
        <div className="flex justify-end">
          <button onClick={handleReset} className="text-sm text-blue-600 hover:text-blue-800">
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}

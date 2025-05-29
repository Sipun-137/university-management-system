"use client"

import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data - in a real application, this would come from an API
const mockBatches = ["2020", "2021", "2022", "2023"]
const mockBranches = ["Computer Science", "Electrical Engineering", "Mechanical Engineering"]
const mockSections = ["Section A", "Section B", "Section C"]
const mockSemesters = [
  "Semester 1",
  "Semester 2",
  "Semester 3",
  "Semester 4",
  "Semester 5",
  "Semester 6",
  "Semester 7",
  "Semester 8",
]

interface StudentFiltersProps {
  onSearchChange: (query: string) => void
  onFilterChange: (filterType: string, value: string) => void
  filters: {
    batch: string
    branch: string
    section: string
    semester: string
    status: string
    gender: string
  }
  showFilters: boolean
}

export function StudentFilters({ onSearchChange, onFilterChange, filters, showFilters }: StudentFiltersProps) {
  return (
    <div className="w-full space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name, email, registration or roll number..."
          className="w-full pl-8"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Select defaultValue={filters.batch} onValueChange={(value) => onFilterChange("batch", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Batches</SelectItem>
              {mockBatches.map((batch) => (
                <SelectItem key={batch} value={batch}>
                  {batch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue={filters.branch} onValueChange={(value) => onFilterChange("branch", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              {mockBranches.map((branch) => (
                <SelectItem key={branch} value={branch}>
                  {branch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue={filters.section} onValueChange={(value) => onFilterChange("section", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sections</SelectItem>
              {mockSections.map((section) => (
                <SelectItem key={section} value={section}>
                  {section}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue={filters.semester} onValueChange={(value) => onFilterChange("semester", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Semesters</SelectItem>
              {mockSemesters.map((semester) => (
                <SelectItem key={semester} value={semester}>
                  {semester}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue={filters.status} onValueChange={(value) => onFilterChange("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="GRADUATED">Graduated</SelectItem>
              <SelectItem value="SUSPENDED">Suspended</SelectItem>
              <SelectItem value="ON_LEAVE">On Leave</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue={filters.gender} onValueChange={(value) => onFilterChange("gender", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genders</SelectItem>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useEffect, useCallback } from "react"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// Mock departments for filtering
const mockDepartments = [
  { id: "1", name: "Computer Science" },
  { id: "2", name: "Electrical Engineering" },
  { id: "3", name: "Mechanical Engineering" },
  { id: "4", name: "Civil Engineering" },
]

interface FacultyFiltersProps {
  faculty: any[]
  onFilter: (filtered: any[]) => void
  activeTab: string
}

export function FacultyFilters({ faculty, onFilter, activeTab }: FacultyFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("")

  // Use useCallback to memoize the filtering function
  const applyFilters = useCallback(() => {
    let filtered = [...faculty]

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (f) =>
          f.name.toLowerCase().includes(term) ||
          f.email.toLowerCase().includes(term) ||
          f.phone.includes(term) ||
          f.employeeId.toLowerCase().includes(term),
      )
    }

    // Filter by department
    if (departmentFilter && departmentFilter !== "all") {
      filtered = filtered.filter((f) => f.department.id.toString() === departmentFilter)
    }

    onFilter(filtered)
  }, [searchTerm, departmentFilter, faculty, onFilter])

  // Call applyFilters when dependencies change
  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-end md:space-x-4 md:space-y-0">
      <div className="flex-1 space-y-2">
        <Label htmlFor="search">Search Faculty</Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Search by name, email, phone, or employee ID..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full md:w-[200px] space-y-2">
        <Label htmlFor="department">Department</Label>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger id="department">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {mockDepartments.map((dept) => (
              <SelectItem key={dept.id} value={dept.id}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

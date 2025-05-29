"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { RefreshCw, Search } from "lucide-react"

export function TimetableFilters({ timetableData, onFilter, onFetchAll, onFetchByBranchAndYear, isLoading }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("")
  const [selectedSection, setSelectedSection] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedDay, setSelectedDay] = useState("")
  const [selectedShift, setSelectedShift] = useState("")

  // Extract unique values for filter options
  const branches = [...new Set(timetableData.map((item) => item.branchName))]
  const sections = [...new Set(timetableData.map((item) => item.sectionName))]
  const years = [...new Set(timetableData.map((item) => item.academicYear))]
  const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
  const shifts = ["MORNING", "AFTERNOON", "EVENING"]

  // Apply filters
  useEffect(() => {
    let filtered = [...timetableData]

    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.sectionName.toLowerCase().includes(search) ||
          item.branchName.toLowerCase().includes(search) ||
          item.subject.name.toLowerCase().includes(search) ||
          item.faculty.name.toLowerCase().includes(search) ||
          item.subject.subjectCode.toLowerCase().includes(search),
      )
    }

    if (selectedBranch && selectedBranch !== "all") {
      filtered = filtered.filter((item) => item.branchName === selectedBranch)
    }

    if (selectedSection && selectedSection !== "all") {
      filtered = filtered.filter((item) => item.sectionName === selectedSection)
    }

    if (selectedYear && selectedYear !== "all") {
      filtered = filtered.filter((item) => item.academicYear === selectedYear)
    }

    if (selectedDay && selectedDay !== "all") {
      filtered = filtered.filter((item) => item.timeSlot.day === selectedDay)
    }

    if (selectedShift && selectedShift !== "all") {
      filtered = filtered.filter((item) => item.timeSlot.shift === selectedShift)
    }

    onFilter(filtered)
  }, [timetableData, searchTerm, selectedBranch, selectedSection, selectedYear, selectedDay, selectedShift, onFilter])

  const handleReset = () => {
    setSearchTerm("")
    setSelectedBranch("")
    setSelectedSection("")
    setSelectedYear("")
    setSelectedDay("")
    setSelectedShift("")
  }

  const handleFetchByBranchAndYear = () => {
    if (selectedBranch && selectedYear) {
      // You would need to map branch names to IDs in a real implementation
      const branchId = 2 // This should be dynamic based on selected branch
      onFetchByBranchAndYear(branchId, selectedYear)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={onFetchAll} disabled={isLoading} variant="outline">
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Fetch All Timetables
        </Button>
        <Button
          onClick={handleFetchByBranchAndYear}
          disabled={isLoading || !selectedBranch || !selectedYear}
          variant="outline"
        >
          <Search className="mr-2 h-4 w-4" />
          Fetch by Branch & Year
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search by section, subject, faculty, or code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="branch">Branch</Label>
          <Select
            value={selectedBranch || "all"}
            onValueChange={(value) => setSelectedBranch(value === "all" ? "" : value)}
          >
            <SelectTrigger id="branch">
              <SelectValue placeholder="All Branches" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              {branches.map((branch) => (
                <SelectItem key={branch} value={branch}>
                  {branch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="section">Section</Label>
          <Select
            value={selectedSection || "all"}
            onValueChange={(value) => setSelectedSection(value === "all" ? "" : value)}
          >
            <SelectTrigger id="section">
              <SelectValue placeholder="All Sections" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sections</SelectItem>
              {sections.map((section) => (
                <SelectItem key={section} value={section}>
                  {section}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Academic Year</Label>
          <Select
            value={selectedYear || "all"}
            onValueChange={(value) => setSelectedYear(value === "all" ? "" : value)}
          >
            <SelectTrigger id="year">
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="day">Day</Label>
          <Select value={selectedDay || "all"} onValueChange={(value) => setSelectedDay(value === "all" ? "" : value)}>
            <SelectTrigger id="day">
              <SelectValue placeholder="All Days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Days</SelectItem>
              {days.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="shift">Shift</Label>
          <Select
            value={selectedShift || "all"}
            onValueChange={(value) => setSelectedShift(value === "all" ? "" : value)}
          >
            <SelectTrigger id="shift">
              <SelectValue placeholder="All Shifts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Shifts</SelectItem>
              {shifts.map((shift) => (
                <SelectItem key={shift} value={shift}>
                  {shift}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {(searchTerm || selectedBranch || selectedSection || selectedYear || selectedDay || selectedShift) && (
        <div className="flex justify-end">
          <Button variant="ghost" onClick={handleReset}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  )
}

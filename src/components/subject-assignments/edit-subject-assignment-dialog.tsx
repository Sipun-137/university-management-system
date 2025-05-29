"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockFaculties, mockSubjects, mockSections } from "./subject-assignment-management"

export function EditSubjectAssignmentDialog({ open, onOpenChange, assignment, onEdit, isLoading }) {
  const [formData, setFormData] = useState({
    id: "",
    facultyId: "",
    sectionId: "",
    subjectId: "",
    academicYear: "",
    term: "",
    weeklyHours: "",
  })
  const [errors, setErrors] = useState({})

  // Initialize form data when assignment changes
  useEffect(() => {
    if (assignment) {
      setFormData({
        id: assignment.id,
        facultyId: assignment.faculty.id.toString(),
        sectionId: assignment.section.id.toString(),
        subjectId: assignment.subject.id.toString(),
        academicYear: assignment.academicYear,
        term: assignment.term,
        weeklyHours: assignment.weeklyHours.toString(),
      })
    }
  }, [assignment])

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
    // Clear error when field is updated
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.facultyId) {
      newErrors.facultyId = "Faculty is required"
    }

    if (!formData.sectionId) {
      newErrors.sectionId = "Section is required"
    }

    if (!formData.subjectId) {
      newErrors.subjectId = "Subject is required"
    }

    if (!formData.academicYear) {
      newErrors.academicYear = "Academic year is required"
    }

    if (!formData.term) {
      newErrors.term = "Term is required"
    }

    if (!formData.weeklyHours) {
      newErrors.weeklyHours = "Weekly hours is required"
    } else if (isNaN(formData.weeklyHours) || Number.parseInt(formData.weeklyHours) <= 0) {
      newErrors.weeklyHours = "Weekly hours must be a positive number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Get faculty, subject, and section details
      const facultyDetails = mockFaculties.find((f) => f.id === Number.parseInt(formData.facultyId))
      const subjectDetails = mockSubjects.find((s) => s.id === Number.parseInt(formData.subjectId))
      const sectionDetails = mockSections.find((s) => s.id === Number.parseInt(formData.sectionId))

      // Create updated assignment with the same structure as backend
      const updatedAssignment = {
        ...assignment,
        faculty: {
          ...assignment.faculty,
          id: Number.parseInt(formData.facultyId),
          name: facultyDetails?.name || assignment.faculty.name,
        },
        section: {
          ...assignment.section,
          id: Number.parseInt(formData.sectionId),
          name: sectionDetails?.name || assignment.section.name,
        },
        subject: {
          ...assignment.subject,
          id: Number.parseInt(formData.subjectId),
          name: subjectDetails?.name || assignment.subject.name,
        },
        academicYear: formData.academicYear,
        term: formData.term,
        weeklyHours: Number.parseInt(formData.weeklyHours),
      }

      onEdit(updatedAssignment)
    }
  }

  // Generate academic year options (current year and 5 years into the future)
  const currentYear = new Date().getFullYear()
  const academicYears = Array.from({ length: 6 }, (_, i) => (currentYear - 2 + i).toString())

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Subject Assignment</DialogTitle>
            <DialogDescription>Update the subject assignment details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="faculty" className="text-right">
                Faculty
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.facultyId}
                  onValueChange={(value) => handleChange("facultyId", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="faculty">
                    <SelectValue placeholder="Select Faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockFaculties.map((faculty) => (
                      <SelectItem key={faculty.id} value={faculty.id.toString()}>
                        {faculty.name} ({faculty.employeeId})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.facultyId && <p className="text-sm text-red-500 mt-1">{errors.facultyId}</p>}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.subjectId}
                  onValueChange={(value) => handleChange("subjectId", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSubjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id.toString()}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subjectId && <p className="text-sm text-red-500 mt-1">{errors.subjectId}</p>}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="section" className="text-right">
                Section
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.sectionId}
                  onValueChange={(value) => handleChange("sectionId", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="section">
                    <SelectValue placeholder="Select Section" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSections.map((section) => (
                      <SelectItem key={section.id} value={section.id.toString()}>
                        Section {section.name} ({section.currentStrength}/{section.maxStrength})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.sectionId && <p className="text-sm text-red-500 mt-1">{errors.sectionId}</p>}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="academicYear" className="text-right">
                Academic Year
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.academicYear}
                  onValueChange={(value) => handleChange("academicYear", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="academicYear">
                    <SelectValue placeholder="Select Academic Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {academicYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.academicYear && <p className="text-sm text-red-500 mt-1">{errors.academicYear}</p>}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="term" className="text-right">
                Term
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.term}
                  onValueChange={(value) => handleChange("term", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="term">
                    <SelectValue placeholder="Select Term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fall">Fall</SelectItem>
                    <SelectItem value="Spring">Spring</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                  </SelectContent>
                </Select>
                {errors.term && <p className="text-sm text-red-500 mt-1">{errors.term}</p>}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="weeklyHours" className="text-right">
                Weekly Hours
              </Label>
              <div className="col-span-3">
                <Input
                  id="weeklyHours"
                  type="number"
                  min="1"
                  max="20"
                  value={formData.weeklyHours}
                  onChange={(e) => handleChange("weeklyHours", e.target.value)}
                  disabled={isLoading}
                />
                {errors.weeklyHours && <p className="text-sm text-red-500 mt-1">{errors.weeklyHours}</p>}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Assignment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

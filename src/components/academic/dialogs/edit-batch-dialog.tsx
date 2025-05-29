/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"

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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditBatchDialogProps {
  open: boolean
  onClose: () => void
  onSave: (batch: any) => void
  batch: any
  courses: {
    durationInYears: number ;id: number; name: string 
}[]
}

export function EditBatchDialog({ open, onClose, onSave, batch, courses }: EditBatchDialogProps) {
  const [startYear, setStartYear] = useState<number>(0)
  const [endYear, setEndYear] = useState<number>(0)
  const [courseId, setCourseId] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (batch) {
      setStartYear(batch.startYear)
      setEndYear(batch.endYear)

      // Find the course ID based on the course name
      const course = courses.find((c) => c.name === batch.course)
      setCourseId(course ? course.id.toString() : "")
    }
  }, [batch, courses])

  const handleStartYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = Number.parseInt(e.target.value)
    setStartYear(year)

    // Find the selected course
    const selectedCourse = courses.find((course) => course.id.toString() === courseId)
    if (selectedCourse) {
      // Update end year based on course duration
      const duration = selectedCourse.name === "B.Tech" ? 4 : selectedCourse.name === "BCA" ? 3 : 2
      setEndYear(year + duration)
    }
  }

  const handleCourseChange = (value: string) => {
    setCourseId(value)

    // Find the selected course
    const selectedCourse = courses.find((course) => course.id.toString() === value)
    if (selectedCourse) {
      // Update end year based on course duration
      const duration = selectedCourse.durationInYears
      setEndYear(startYear + duration)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate form
    if (!startYear) {
      setError("Start year is required")
      return
    }

    if (!endYear) {
      setError("End year is required")
      return
    }

    if (endYear <= startYear) {
      setError("End year must be greater than start year")
      return
    }

    if (!courseId) {
      setError("Course is required")
      return
    }

    setIsSubmitting(true)

    try {
      // In a real application, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const selectedCourse = courses.find((course) => course.id.toString() === courseId)

      onSave({
        id: batch.id,
        startYear,
        endYear,
        course: selectedCourse?.name,
        courseId: Number.parseInt(courseId),
      })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to update batch. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Batch</DialogTitle>
            <DialogDescription>Update batch details.</DialogDescription>
          </DialogHeader>

          {error && (
            <Alert variant="destructive" className="my-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select value={courseId} onValueChange={handleCourseChange} required>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id.toString()}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startYear">Start Year</Label>
                <Input
                  id="startYear"
                  type="number"
                  min={2000}
                  max={2100}
                  value={startYear}
                  onChange={handleStartYearChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endYear">End Year</Label>
                <Input
                  id="endYear"
                  type="number"
                  min={2000}
                  max={2100}
                  value={endYear}
                  onChange={(e) => setEndYear(Number.parseInt(e.target.value))}
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

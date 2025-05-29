"use client"

import type React from "react"

import { useState } from "react"
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

interface AddBatchDialogProps {
  open: boolean
  onClose: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAdd: (batch: any) => void
  courses: { id: number; name: string ;durationInYears:number}[]
}

export function AddBatchDialog({ open, onClose, onAdd, courses }: AddBatchDialogProps) {
  const [startYear, setStartYear] = useState<number>(new Date().getFullYear())
  const [endYear, setEndYear] = useState<number>(new Date().getFullYear() + 4)
  const [courseId, setCourseId] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleStartYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = Number.parseInt(e.target.value)
    setStartYear(year)

    // Find the selected course
    const selectedCourse = courses.find((course) => course.id.toString() === courseId)
    if (selectedCourse) {
      // Update end year based on course duration
      const duration = selectedCourse.durationInYears;
      setEndYear(year + duration)
    }
  }

  const handleCourseChange = (value: string) => {
    setCourseId(value)

    // Find the selected course
    const selectedCourse = courses.find((course) => course.id.toString() === value)
    if (selectedCourse) {
      // Update end year based on course duration
      const duration = selectedCourse.name === "B.Tech" ? 4 : selectedCourse.name === "BCA" ? 3 : 2
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

      onAdd({
        startYear,
        endYear,
        course: selectedCourse?.name,
        courseId: Number.parseInt(courseId),
      })

      // Reset form
      setStartYear(new Date().getFullYear())
      setEndYear(new Date().getFullYear() + 4)
      setCourseId("")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to add batch. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Batch</DialogTitle>
            <DialogDescription>Add a new student batch for a course.</DialogDescription>
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
              {isSubmitting ? "Adding..." : "Add Batch"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

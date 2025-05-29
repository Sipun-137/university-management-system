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

interface EditBranchDialogProps {
  open: boolean
  onClose: () => void
  onSave: (branch: any) => void
  branch: any
  courses: { id: number; name: string }[]
}

export function EditBranchDialog({ open, onClose, onSave, branch, courses }: EditBranchDialogProps) {
  const [name, setName] = useState("")
  const [courseId, setCourseId] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (branch) {
      setName(branch.name)

      // Find the course ID based on the course name
      const course = courses.find((c) => c.name === branch.course)
      setCourseId(course ? course.id.toString() : "")
    }
  }, [branch, courses])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate form
    if (!name) {
      setError("Branch name is required")
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
        id: branch.id,
        name,
        course: selectedCourse?.name,
        courseId: Number.parseInt(courseId),
      })
    } catch (err) {
      setError("Failed to update branch. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Branch</DialogTitle>
            <DialogDescription>Update branch details.</DialogDescription>
          </DialogHeader>

          {error && (
            <Alert variant="destructive" className="my-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Branch Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Computer Science, Mechanical Engineering"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select value={courseId} onValueChange={setCourseId} required>
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

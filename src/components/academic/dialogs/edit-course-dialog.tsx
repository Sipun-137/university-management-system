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

interface EditCourseDialogProps {
  open: boolean
  onClose: () => void
  onSave: (course: any) => void
  course: any
}

export function EditCourseDialog({ open, onClose, onSave, course }: EditCourseDialogProps) {
  const [name, setName] = useState("")
  const [durationInYears, setDurationInYears] = useState<number>(4)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (course) {
      setName(course.name)
      setDurationInYears(course.durationInYears)
    }
  }, [course])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate form
    if (!name) {
      setError("Course name is required")
      return
    }

    if (!durationInYears || durationInYears < 1) {
      setError("Duration must be at least 1 year")
      return
    }

    setIsSubmitting(true)

    try {
      // In a real application, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      onSave({
        id: course.id,
        name,
        durationInYears,
      })
    } catch (err) {
      setError("Failed to update course. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>Update course details.</DialogDescription>
          </DialogHeader>

          {error && (
            <Alert variant="destructive" className="my-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Course Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., B.Tech, BCA, MBA"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (Years)</Label>
              <Input
                id="duration"
                type="number"
                min={1}
                max={10}
                value={durationInYears}
                onChange={(e) => setDurationInYears(Number.parseInt(e.target.value))}
                required
              />
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

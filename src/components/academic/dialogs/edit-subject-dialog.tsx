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

interface EditSubjectDialogProps {
  open: boolean
  onClose: () => void
  onSave: (subject: any) => void
  subject: any
  semesters: { id: number; name: string; branch: string; course: string }[]
}

export function EditSubjectDialog({ open, onClose, onSave, subject, semesters }: EditSubjectDialogProps) {
  const [name, setName] = useState("")
  const [subjectCode, setSubjectCode] = useState("")
  const [credits, setCredits] = useState<number>(3)
  const [semesterId, setSemesterId] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (subject) {
      setName(subject.name)
      setSubjectCode(subject.subjectCode)
      setCredits(subject.credits)

      // Find the semester ID based on the semester name, branch, and course
      const semester = semesters.find(
        (s) => s.name === subject.semester && s.branch === subject.branch && s.course === subject.course,
      )
      setSemesterId(semester ? semester.id.toString() : "")
    }
  }, [subject, semesters])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate form
    if (!name) {
      setError("Subject name is required")
      return
    }

    if (!subjectCode) {
      setError("Subject code is required")
      return
    }

    if (!credits || credits < 1) {
      setError("Credits must be at least 1")
      return
    }

    if (!semesterId) {
      setError("Semester is required")
      return
    }

    setIsSubmitting(true)

    try {
      // In a real application, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const selectedSemester = semesters.find((semester) => semester.id.toString() === semesterId)

      onSave({
        id: subject.id,
        name,
        subjectCode,
        credits,
        semester: selectedSemester?.name,
        branch: selectedSemester?.branch,
        course: selectedSemester?.course,
        semesterId: Number.parseInt(semesterId),
      })
    } catch (err) {
      setError("Failed to update subject. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Subject</DialogTitle>
            <DialogDescription>Update subject details.</DialogDescription>
          </DialogHeader>

          {error && (
            <Alert variant="destructive" className="my-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Subject Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Data Structures and Algorithms"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subjectCode">Subject Code</Label>
              <Input
                id="subjectCode"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                placeholder="e.g., CS201"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="credits">Credits</Label>
              <Input
                id="credits"
                type="number"
                min={1}
                max={10}
                value={credits}
                onChange={(e) => setCredits(Number.parseInt(e.target.value))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select value={semesterId} onValueChange={setSemesterId} required>
                <SelectTrigger id="semester">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((semester) => (
                    <SelectItem key={semester.id} value={semester.id.toString()}>
                      {semester.name} - {semester.branch} ({semester.course})
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

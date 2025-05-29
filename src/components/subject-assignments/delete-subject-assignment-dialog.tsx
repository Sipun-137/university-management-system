"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function DeleteSubjectAssignmentDialog({ open, onOpenChange, assignment, onDelete, isLoading }) {
  const handleDelete = () => {
    onDelete()
  }

  if (!assignment) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Subject Assignment</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this subject assignment? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-2 text-sm">
            <p>
              <strong>Faculty:</strong> {assignment.faculty.name} ({assignment.faculty.employeeId})
            </p>
            <p>
              <strong>Subject:</strong> {assignment.subject.name}
            </p>
            <p>
              <strong>Section:</strong> {assignment.section.name}
            </p>
            <p>
              <strong>Academic Year:</strong> {assignment.academicYear}
            </p>
            <p>
              <strong>Term:</strong> {assignment.term}
            </p>
            <p>
              <strong>Weekly Hours:</strong> {assignment.weeklyHours}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete Assignment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

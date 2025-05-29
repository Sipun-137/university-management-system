"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import { EditSubjectAssignmentDialog } from "./edit-subject-assignment-dialog"
import { DeleteSubjectAssignmentDialog } from "./delete-subject-assignment-dialog"

export function SubjectAssignmentList({ assignments, onEdit, onDelete, isLoading }) {
  const [editingAssignment, setEditingAssignment] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deletingAssignment, setDeletingAssignment] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (assignment) => {
    setDeletingAssignment(assignment)
    setIsDeleteDialogOpen(true)
  }

  const handleEditConfirm = (updatedAssignment) => {
    onEdit(updatedAssignment)
    setIsEditDialogOpen(false)
  }

  const handleDeleteConfirm = () => {
    onDelete(deletingAssignment.id)
    setIsDeleteDialogOpen(false)
  }

  const getDesignationBadgeColor = (designation) => {
    switch (designation) {
      case "PROFESSOR":
        return "bg-purple-100 text-purple-800"
      case "ASSOCIATE_PROFESSOR":
        return "bg-blue-100 text-blue-800"
      case "ASSISTANT_PROFESSOR":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDesignation = (designation) => {
    return (
      designation
        ?.replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (l) => l.toUpperCase()) || "Unknown"
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Faculty</TableHead>
            <TableHead>Employee ID</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Section</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Academic Year</TableHead>
            <TableHead>Term</TableHead>
            <TableHead>Weekly Hours</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                No assignments found.
              </TableCell>
            </TableRow>
          ) : (
            assignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{assignment.faculty.name}</span>
                    <Badge
                      variant="secondary"
                      className={`text-xs w-fit ${getDesignationBadgeColor(assignment.faculty.designation)}`}
                    >
                      {formatDesignation(assignment.faculty.designation)}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">{assignment.faculty.employeeId}</TableCell>
                <TableCell>{assignment.subject.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">Section {assignment.section.name}</span>
                    <span className="text-xs text-gray-500">
                      {assignment.section.currentStrength}/{assignment.section.maxStrength} students
                    </span>
                  </div>
                </TableCell>
                <TableCell>{assignment.faculty.department.name}</TableCell>
                <TableCell>{assignment.academicYear}</TableCell>
                <TableCell>
                  <Badge variant={assignment.term === "Fall" ? "default" : "secondary"}>{assignment.term}</Badge>
                </TableCell>
                <TableCell className="text-center font-medium">{assignment.weeklyHours} hrs</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(assignment)} disabled={isLoading}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(assignment)} disabled={isLoading}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {editingAssignment && (
        <EditSubjectAssignmentDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          assignment={editingAssignment}
          onEdit={handleEditConfirm}
          isLoading={isLoading}
        />
      )}

      {deletingAssignment && (
        <DeleteSubjectAssignmentDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          assignment={deletingAssignment}
          onDelete={handleDeleteConfirm}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

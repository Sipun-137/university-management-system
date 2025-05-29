import type { Metadata } from "next"
import { SubjectAssignmentManagement } from "@/components/subject-assignments/subject-assignment-management"

export const metadata: Metadata = {
  title: "Subject Assignments | University Management System",
  description: "Manage subject assignments to teachers",
}

export default function SubjectAssignmentsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Subject Assignments</h1>
      </div>
      <SubjectAssignmentManagement />
    </div>
  )
}

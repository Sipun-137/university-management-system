import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Faculty Management | University Dashboard",
  description: "Manage faculty members in the university system",
}

import { FacultyManagement } from "@/components/faculty-management/faculty-management"

export default function FacultyPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <FacultyManagement />
    </div>
  )
}

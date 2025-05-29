import type { Metadata } from "next"
import { TimetableManagement } from "@/components/timetable/timetable-management"

export const metadata: Metadata = {
  title: "Timetable Management | University Management System",
  description: "Manage and view university timetables",
}

export default function TimetablePage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Timetable Management</h1>
      </div>
      <TimetableManagement />
    </div>
  )
}

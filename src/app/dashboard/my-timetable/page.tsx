import type { Metadata } from "next"
import { StudentTimetable } from "@/components/student-timetable/student-timetable"

export const metadata: Metadata = {
  title: "My Timetable | University Management System",
  description: "View your class schedule and timetable",
}

export default function StudentTimetablePage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Timetable</h1>
          <p className="text-muted-foreground">View your class schedule and upcoming classes</p>
        </div>
      </div>
      <StudentTimetable />
    </div>
  )
}

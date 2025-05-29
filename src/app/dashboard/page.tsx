"use client"

import { GlobalContext } from "@/context";
// import { useSearchParams } from "next/navigation"
import { useContext } from "react"

// import { DashboardLayout } from "@/components/dashboard-layout"
// import { AdminDashboard } from "@/components/role-dashboards/admin-dashboard"
// import { FacultyDashboard } from "@/components/role-dashboards/faculty-dashboard"
// import { GuestDashboard } from "@/components/role-dashboards/guest-dashboard"
// import { StudentDashboard } from "@/components/role-dashboards/student-dashboard"

export default function DashboardPage() {
  // const searchParams = useSearchParams()
  const{role} =useContext(GlobalContext);

  // useEffect(() => {
  //   // Get role from URL parameter
  //   const roleParam = searchParams.get("role")
  //   setRole(roleParam)
  // }, [searchParams])

  // Render dashboard based on role
  const renderDashboard = () => {
    switch (role) {
      case "ADMIN":
        // return <AdminDashboard />
        return "admin Dashboard"
        return
      case "FACULTY":
        // return <FacultyDashboard />
        return "faculty Dashboard"
      case "STUDENT":
        // return <StudentDashboard />
        return "student Dashboard "
      default:
        // return <GuestDashboard />
        return "guest Dashboard"
    }
  }

  return renderDashboard();
}

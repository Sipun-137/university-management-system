"use client"

import { useSearchParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"

import { AcademicManagement } from "@/components/academic/academic-management"
// import { GuestDashboard } from "@/components/role-dashboards/guest-dashboard"
import { checkPermission, getUserFromRole, type Resource } from "@/lib/abac"
import { GlobalContext } from "@/context"

export default function AcademicPage() {
  const searchParams = useSearchParams()
  const {role}=useContext(GlobalContext);
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    // Get role from URL parameter
    // const roleParam = searchParams.get("role")
    // setRole(roleParam)

    // Check if user has permission to view academic management
    const user = getUserFromRole(role)
    const hasPermission = checkPermission(user, { type: "settings" as Resource }, "update", {})
    setHasAccess(hasPermission)
  }, [searchParams])

  // If user doesn't have access, show guest dashboard
//   if (!hasAccess) {
//     return (
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Access Denied</h1>
//           <p className="text-muted-foreground">You do not have permission to view this page.</p>
//         </div>
//         <GuestDashboard />
//       </div>
//     )
//   }

  return <AcademicManagement />
}

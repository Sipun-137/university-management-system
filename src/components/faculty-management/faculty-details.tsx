"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"

interface FacultyDetailsProps {
  faculty: any
  open: boolean
  onClose: () => void
}

export function FacultyDetails({ faculty, open, onClose }: FacultyDetailsProps) {
  // Format date of birth
  const formattedDob = faculty.dob ? format(new Date(faculty.dob), "PPP") : "Not provided"

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Faculty Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-1">
            <h3 className="text-2xl font-semibold">{faculty.name}</h3>
            <p className="text-muted-foreground">
              {faculty.designation === "PROFESSOR" && "Professor"}
              {faculty.designation === "ASSOCIATE_PROFESSOR" && "Associate Professor"}
              {faculty.designation === "ASSISTANT_PROFESSOR" && "Assistant Professor"}
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Employee ID</h4>
              <p>{faculty.employeeId}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Department</h4>
              <p>{faculty.department.name}</p>
            </div>
          </div>

          <Separator />

          <h4 className="text-md font-semibold">Contact Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
              <p>{faculty.email}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Phone</h4>
              <p>{faculty.phone}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Address</h4>
            <p>{faculty.address || "Not provided"}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Emergency Contact</h4>
            <p>{faculty.emergencyContact || "Not provided"}</p>
          </div>

          <Separator />

          <h4 className="text-md font-semibold">Personal Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Date of Birth</h4>
              <p>{formattedDob}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Gender</h4>
              <p>{faculty.gender || "Not provided"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Blood Group</h4>
              <p>{faculty.bloodGroup || "Not provided"}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Nationality</h4>
              <p>{faculty.nationality || "Not provided"}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

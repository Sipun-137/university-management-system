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
import { Construction } from "lucide-react"

export function CreateTimetableDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Construction className="h-5 w-5" />
            Create Timetable
          </DialogTitle>
          <DialogDescription>This feature is under development and will be available soon.</DialogDescription>
        </DialogHeader>
        <div className="py-8 text-center">
          <Construction className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">
            The timetable creation functionality will be implemented in the next phase. This will include features for:
          </p>
          <ul className="mt-4 text-sm text-gray-500 space-y-1">
            <li>• Automatic timetable generation</li>
            <li>• Conflict detection</li>
            <li>• Manual schedule adjustments</li>
            <li>• Bulk import/export</li>
          </ul>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

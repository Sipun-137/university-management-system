/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"


interface courseDto{
  name:string,
  durationInYears:number
  code:string
}

interface AddCourseDialogProps {
  open: boolean
  onClose: () => void
  onAdd: (course: courseDto) => void
}

export function AddCourseDialog({ open, onClose, onAdd }: AddCourseDialogProps) {
  const [name, setName] = useState("")
  const [durationInYears, setDurationInYears] = useState<number>(4)
  const [code,setCode]=useState("");
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate form
    if (!name) {
      setError("Course name is required")
      return
    }

    if (!durationInYears || durationInYears < 1) {
      setError("Duration must be at least 1 year")
      return
    }

    if(!code){
      setError("Course Code id required")
    }

    setIsSubmitting(true)

    try {
      // In a real application, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      onAdd({
        name,
        durationInYears,
        code
      })

      // Reset form
      setName("")
      setDurationInYears(4)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err:any) {
      setError("Failed to add course. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Course</DialogTitle>
            <DialogDescription>Add a new course to the university.</DialogDescription>
          </DialogHeader>

          {error && (
            <Alert variant="destructive" className="my-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Course Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., B.Tech, BCA, MBA"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Course Code</Label>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g., BTECH, BCA, MBA"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (Years)</Label>
              <Input
                id="duration"
                type="number"
                min={1}
                max={10}
                value={durationInYears}
                onChange={(e) => setDurationInYears(Number.parseInt(e.target.value))}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

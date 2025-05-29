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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface AddSemesterDialogProps {
  open: boolean
  onClose: () => void
  onAdd: (semester: any) => void
  branches: { id: number; name: string; course: {id:number,name:string,durationInYears:number} }[]
}

export function AddSemesterDialog({ open, onClose, onAdd, branches }: AddSemesterDialogProps) {
  const [number, setNumber] = useState<number>(1)
  const [branchId, setBranchId] = useState<string>("")
  const [isActive, setIsActive] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate form
    if (!number || number < 1) {
      setError("Semester number is required and must be at least 1")
      return
    }

    if (!branchId) {
      setError("Branch is required")
      return
    }

    setIsSubmitting(true)

    try {
      // In a real application, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      
      onAdd({
        number,
        branchId: Number.parseInt(branchId),
        isCurrent:isActive,
      })

      // Reset form
      setNumber(1)
      setBranchId("")
      setIsActive(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to add semester. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Semester</DialogTitle>
            <DialogDescription>Add a new semester for a branch.</DialogDescription>
          </DialogHeader>

          {error && (
            <Alert variant="destructive" className="my-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="number">Semester Number</Label>
              <Input
                id="number"
                type="number"
                min={1}
                max={12}
                value={number}
                onChange={(e) => setNumber(Number.parseInt(e.target.value))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Select value={branchId} onValueChange={setBranchId} required>
                <SelectTrigger id="branch">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id.toString()}>
                      {branch.name} ({branch.course.name})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="isActive" className="cursor-pointer">
                Active Semester
              </Label>
              <Switch id="isActive" checked={isActive} onCheckedChange={setIsActive} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Semester"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

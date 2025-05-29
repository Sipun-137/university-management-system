/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
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

interface EditSectionDialogProps {
  open: boolean
  onClose: () => void
  onSave: (section: any) => void
  section: any
  batches: { id: number; courseName: string ,startYear:number,endYear:number }[]
  branches: { id: number; name: string }[]
}

export function EditSectionDialog({ open, onClose, onSave, section, batches, branches }: EditSectionDialogProps) {
  const [name, setName] = useState("")
  const [maxStrength, setMaxStrength] = useState<number>(60)
  const [batchId, setBatchId] = useState<string>("")
  const [branchId, setBranchId] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (section) {
      setName(section.name)
      setMaxStrength(section.maxStrength)

      // Find the batch ID based on the batch name
      const batch = batches.find((b) => b.courseName === section.batch)
      setBatchId(batch ? batch.id.toString() : "")

      // Find the branch ID based on the branch name
      const branch = branches.find((b) => b.name === section.branch)
      setBranchId(branch ? branch.id.toString() : "")
    }
  }, [section, batches, branches])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate form
    if (!name) {
      setError("Section name is required")
      return
    }

    if (!maxStrength || maxStrength < 1) {
      setError("Maximum strength must be at least 1")
      return
    }

    if (!batchId) {
      setError("Batch is required")
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


      onSave({
        id: section.id,
        name,
        maxStrength,
        batchId: Number.parseInt(batchId),
        branchId: Number.parseInt(branchId),
      })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to update section. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Section</DialogTitle>
            <DialogDescription>Update section details.</DialogDescription>
          </DialogHeader>

          {error && (
            <Alert variant="destructive" className="my-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Section Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., A, B, C"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxStrength">Maximum Strength</Label>
              <Input
                id="maxStrength"
                type="number"
                min={section?.currentStrength || 1}
                max={200}
                value={maxStrength}
                onChange={(e) => setMaxStrength(Number.parseInt(e.target.value))}
                required
              />
              {section?.currentStrength > 0 && (
                <p className="text-xs text-muted-foreground">
                  Note: Maximum strength cannot be less than current strength ({section.currentStrength}).
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="batch">Batch</Label>
              <Select value={batchId} onValueChange={setBatchId} required>
                <SelectTrigger id="batch">
                  <SelectValue placeholder="Select batch" />
                </SelectTrigger>
                <SelectContent>
                  {batches.map((batch) => (
                    <SelectItem key={batch.id} value={batch.id.toString()}>
                      {batch.courseName} {batch.startYear}-{batch.endYear}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

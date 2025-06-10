/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "../ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { cn } from "@/lib/utils"

// Mock departments and years for the select fields

const genderOptions = [
  { id: "MALE", name: "Male" },
  { id: "FEMALE", name: "Female" },
  { id: "OTHER", name: "Other" },
]

const bloodGroups = [
  { id: "A+", name: "A+" },
  { id: "A-", name: "A-" },
  { id: "B+", name: "B+" },
  { id: "B-", name: "B-" },
  { id: "AB+", name: "AB+" },
  { id: "AB-", name: "AB-" },
  { id: "O+", name: "O+" },
  { id: "O-", name: "O-" },
]

const relationshipOptions = [
  { id: "Father", name: "Father" },
  { id: "Mother", name: "Mother" },
  { id: "Guardian", name: "Guardian" },
  { id: "Uncle", name: "Uncle" },
  { id: "Aunt", name: "Aunt" },
  { id: "Grandfather", name: "Grandfather" },
  { id: "Grandmother", name: "Grandmother" },
  { id: "Other", name: "Other" },
]


interface EditStudentDialogProps {
  open: boolean
  onClose: () => void
  onSave: (studentData: any) => void
  studentData: any
}

export function EditStudentDialog({ open, onClose, onSave, studentData }: EditStudentDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")
  const [formData, setFormData] = useState(studentData || {})
   const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(
    studentData?.dob ? new Date(studentData.dob) : undefined,
  )


  const handleClose=()=>{
    onClose();
    setFormData({});
  }

  useEffect(()=>{
    if(open){
      setFormData(studentData);
    }else{
      setFormData({});
    }
  },[open, studentData])


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }))
  }

   const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleGuardianChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      guardian: {
        ...prev.guardian,
        [field]: value,
      },
    }))
  }



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const dataToSubmit = {
        ...formData,
      }
      
      onSave(dataToSubmit)
    } catch (error) {
      console.error("Error updating student:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Student Details</DialogTitle>
          <DialogDescription>Update student information. Click save when you&apos;re done.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="academic">Academic Info</TabsTrigger>
              <TabsTrigger value="guardian">Guardian Info</TabsTrigger>
            </TabsList>

             <TabsContent value="personal" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" name="name" value={formData.name || ""} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    required
                    disabled className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" name="phone" value={formData.phone || ""} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender || ""} onValueChange={(value) => handleSelectChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {genderOptions.map((gender) => (
                        <SelectItem key={gender.id} value={gender.id}>
                          {gender.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateOfBirth && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateOfBirth ? format(dateOfBirth, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dateOfBirth} onSelect={setDateOfBirth} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select
                    value={formData.bloodGroup || ""}
                    onValueChange={(value) => handleSelectChange("bloodGroup", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodGroups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    name="nationality"
                    value={formData.nationality || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

             <TabsContent value="academic" className="space-y-4 mt-4">
              <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Academic information is read-only and can only be modified by academic administrators.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Registration Number</Label>
                  <Input value={formData.regdNo || ""} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Roll Number</Label>
                  <Input value={formData.rollNo || ""} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Course</Label>
                  <Input value={formData.course || ""} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Branch</Label>
                  <Input value={formData.branch?.name || ""} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Section</Label>
                  <Input value={formData.section || ""} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Current Semester</Label>
                  <Input value={formData.currentSemester || ""} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Batch</Label>
                  <Input
                    value={formData.batch ? `${formData.batch.startYear} - ${formData.batch.endYear}` : ""}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Academic Status</Label>
                  <div className="flex items-center h-10">
                    <Badge
                      variant={formData.academicStatus === "ACTIVE" ? "default" : "secondary"}
                      className={formData.academicStatus === "ACTIVE" ? "bg-green-500" : ""}
                    >
                      {formData.academicStatus || "N/A"}
                    </Badge>
                  </div>
                </div>
              </div>
            </TabsContent>


            <TabsContent value="guardian" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guardianName">Guardian Name</Label>
                  <Input
                    id="guardianName"
                    name="guardianName"
                    value={formData.guardian?.guardianName || ""}
                    onChange={(e) => handleGuardianChange("guardianName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guardianPhone">Guardian Phone</Label>
                  <Input
                    id="guardianPhone"
                    name="guardianPhone"
                    value={formData.guardian?.guardianPhone || ""}
                    onChange={(e) => handleGuardianChange("guardianPhone", e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Select
                    value={formData.guardian?.relationship || ""}
                    onValueChange={(value) => handleGuardianChange("relationship", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      {relationshipOptions.map((relation) => (
                        <SelectItem key={relation.id} value={relation.id}>
                          {relation.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button variant="outline" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

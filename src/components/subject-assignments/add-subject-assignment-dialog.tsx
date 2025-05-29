/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


interface AddSubjectAssignmentDialogProps {
  open: boolean;
  onOpenChange: (isopen:boolean) => void;
  onAdd: (newAssignment: { facultyId: number; subjectId: number; sectionId: number,academicYear:string,term:string,weeklyHours:number }) => void;
  faculties:any [];
  subjects:any [];
  sections:any [];
  isLoading: boolean;
}

export function AddSubjectAssignmentDialog({
  open,
  onOpenChange,
  onAdd,
  isLoading,
  faculties,
  sections,
  subjects
}: AddSubjectAssignmentDialogProps) {
  const [formData, setFormData] = useState({
    facultyId: "",
    sectionId: "",
    subjectId: "",
    academicYear: new Date().getFullYear().toString(),
    term: "Fall",
    weeklyHours: "4",
  });
  const [errors, setErrors] = useState<{
    facultyId?: string;
    sectionId?: string;
    subjectId?: string;
    academicYear?: string;
    term?: string;
    weeklyHours?: string;
  }>({});

  const handleChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    // Clear error when field is updated
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: undefined,
      });
    }
  };

  const validateForm = () => {
    const newErrors: {
      facultyId?: string;
      sectionId?: string;
      subjectId?: string;
      academicYear?: string;
      term?: string;
      weeklyHours?: string;
    } = {};

    if (!formData.facultyId) {
      newErrors.facultyId = "Faculty is required";
    }

    if (!formData.sectionId) {
      newErrors.sectionId = "Section is required";
    }

    if (!formData.subjectId) {
      newErrors.subjectId = "Subject is required";
    }

    if (!formData.academicYear) {
      newErrors.academicYear = "Academic year is required";
    }

    if (!formData.term) {
      newErrors.term = "Term is required";
    }

    if (!formData.weeklyHours) {
      newErrors.weeklyHours = "Weekly hours is required";
    } else if (
      isNaN(Number(formData.weeklyHours)) ||
      Number.parseInt(formData.weeklyHours) <= 0
    ) {
      newErrors.weeklyHours = "Weekly hours must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (validateForm()) {
      onAdd({
        facultyId: Number.parseInt(formData.facultyId),
        sectionId: Number.parseInt(formData.sectionId),
        subjectId: Number.parseInt(formData.subjectId),
        academicYear: formData.academicYear,
        term: formData.term,
        weeklyHours: Number.parseInt(formData.weeklyHours),
      });

      // Reset form
      setFormData({
        facultyId: "",
        sectionId: "",
        subjectId: "",
        academicYear:"",
        term: "Fall",
        weeklyHours: "4",
      });
      setErrors({});
    }
  };

  // Generate academic year options (current year and 5 years into the future)
  const currentYear = new Date().getFullYear();
  const academicYears = Array.from({ length: 10 }, (_, i) =>
    ((currentYear-3 + i)+"-"+ (currentYear-2 + i)).toString()
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Subject Assignment</DialogTitle>
            <DialogDescription>
              Assign a subject to a faculty member for a specific section.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="faculty" className="text-right">
                Faculty
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.facultyId}
                  onValueChange={(value) => handleChange("facultyId", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="faculty">
                    <SelectValue placeholder="Select Faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    {faculties.map((faculty) => (
                      <SelectItem
                        key={faculty.id}
                        value={faculty.id.toString()}
                      >
                        {faculty.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.facultyId && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.facultyId}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.subjectId}
                  onValueChange={(value) => handleChange("subjectId", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem
                        key={subject.id}
                        value={subject.id.toString()}
                      >
                        {subject.name} 
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subjectId && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.subjectId}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="section" className="text-right">
                Section
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.sectionId}
                  onValueChange={(value) => handleChange("sectionId", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="section">
                    <SelectValue placeholder="Select Section" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map((section) => (
                      <SelectItem
                        key={section.id}
                        value={section.id.toString()}
                      >
                        {section.name} {section.batch.startYear} {section.branch.course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.sectionId && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.sectionId}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="academicYear" className="text-right">
                Academic Year
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.academicYear}
                  onValueChange={(value) => handleChange("academicYear", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="academicYear">
                    <SelectValue placeholder="Select Academic Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {academicYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.academicYear && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.academicYear}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="term" className="text-right">
                Term
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.term}
                  onValueChange={(value) => handleChange("term", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="term">
                    <SelectValue placeholder="Select Term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fall">Fall</SelectItem>
                    <SelectItem value="Spring">Spring</SelectItem>
                  </SelectContent>
                </Select>
                {errors.term && (
                  <p className="text-sm text-red-500 mt-1">{errors.term}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="weeklyHours" className="text-right">
                Weekly Hours
              </Label>
              <div className="col-span-3">
                <Input
                  id="weeklyHours"
                  type="number"
                  min="1"
                  max="20"
                  value={formData.weeklyHours}
                  onChange={(e) => handleChange("weeklyHours", e.target.value)}
                  disabled={isLoading}
                />
                {errors.weeklyHours && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.weeklyHours}
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Assignment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

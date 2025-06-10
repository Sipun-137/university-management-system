"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { CalendarIcon, AlertCircle } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { getAllBatches } from "@/services/AcademicService/BatchService";
import { GetAllBranch } from "@/services/AcademicService/BranchService";

interface StudentDTO {
  name: string;
  email: string;
  phone: string;
  emergencyContact: string;
  gender: string;
  address: string;
  dob: Date;
  batchId: number | null;
  branchId: number | null;
  courseId: number | null;
  bloodGroup: string;
  nationality: string;
  guardian: {
    guardianName: string;
    guardianPhone: number;
    relationship: string;
  };
}

interface BatchI {
  id: number;
  startYear: number;
  endYear: number;
  course: {
    id: number;
    name: string;
  };
}

interface BranchI {
  id: number;
  name: string;
}

interface AddStudentDialogProps {
  open: boolean;
  onClose: () => void;
  onStudentAdded: (student: StudentDTO) => void;
}

export function AddStudentDialog({
  open,
  onClose,
  onStudentAdded,
}: AddStudentDialogProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Student Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState<Date>();
  const [gender, setGender] = useState("MALE");
  const [address, setAddress] = useState("");
  const [batchId, setBatchId] = useState<string>("");
  const [branchId, setBranchId] = useState<number | null>(null);
  const [courseId, setCourseId] = useState<number | null>(null);
  const [bloodGroup, setBloodGroup] = useState("");
  const [nationality, setNationality] = useState("Indian");
  const [emergencyContact, setEmergencyContact] = useState("");

  // Guardian Form State
  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [relationship, setRelationship] = useState("Father");

  const [batches, setBatches] = useState<BatchI[]>([]);
  const [branches, setBranches] = useState<BranchI[]>([]);

  async function loadBatches() {
    const batchData = await getAllBatches();
    setBatches(batchData);
  }

  async function loadBranches() {
    const branchData = await GetAllBranch();
    setBranches(branchData);
  }

  useEffect(() => {
    loadBatches();
    loadBranches();
  }, []);

  useEffect(() => {
    const selectedBatch = batches.find((batch) => batch.id === Number(batchId));
    if (selectedBatch) {
      setCourseId(selectedBatch.course.id);
    }
  }, [batchId]);

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate first step
      if (!name || !email || !phone || !dob || !gender || !address) {
        setError("Please fill all required fields");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address");
        return;
      }

      // Phone validation
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phone)) {
        setError("Phone number must be 10 digits");
        return;
      }
    } else if (currentStep === 2) {
      // Validate second step
      if (!batchId || !branchId) {
        setError("Please fill all required fields");
        return;
      }
    }

    setError(null);
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setError(null);
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate final step
    if (!guardianName || !guardianPhone || !relationship) {
      setError("Please fill all required guardian fields");
      return;
    }

    // Guardian phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(guardianPhone)) {
      setError("Guardian phone number must be 10 digits");
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real application, this would be an API call to create a student
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Call the onStudentAdded callback
      onStudentAdded({
        name,
        email,
        phone,
        emergencyContact,
        gender,
        address,
        dob: dob as Date,
        batchId: batchId ? Number(batchId) : null,
        branchId,
        courseId,
        bloodGroup,
        nationality,
        guardian: {
          guardianName,
          guardianPhone: Number(guardianPhone),
          relationship,
        },
      });

      // Reset form
      resetForm();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to add student. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setName("");
    setEmail("");
    setPhone("");
    setDob(undefined);
    setGender("MALE");
    setAddress("");
    setBatchId("");
    setBranchId(null);
    setCourseId(null);
    setBloodGroup("");
    setNationality("Indian");
    setEmergencyContact("");
    setGuardianName("");
    setGuardianPhone("");
    setRelationship("Father");
  };

  const handleDialogClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            {currentStep === 1 && "Enter the student's personal information."}
            {currentStep === 2 && "Enter the student's academic information."}
            {currentStep === 3 && "Enter the student's guardian information."}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="my-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={(e) => e.preventDefault()}>
          {currentStep === 1 && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">
                    Date of Birth <span className="text-red-500">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dob && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dob ? format(dob, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dob}
                        onSelect={setDob}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">
                  Gender <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  onValueChange={setGender}
                  value={gender}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="MALE" id="gender-male" />
                    <Label htmlFor="gender-male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="FEMALE" id="gender-female" />
                    <Label htmlFor="gender-female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="OTHER" id="gender-other" />
                    <Label htmlFor="gender-other">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">
                  Address <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select value={bloodGroup} onValueChange={setBloodGroup}>
                    <SelectTrigger id="bloodGroup">
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  placeholder="Name and phone number"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="batch">
                    Batch <span className="text-red-500">*</span>
                  </Label>
                  <Select value={batchId} onValueChange={setBatchId}>
                    <SelectTrigger id="batch">
                      <SelectValue placeholder="Select batch" />
                    </SelectTrigger>
                    <SelectContent>
                      {batches.map((batch) => (
                        <SelectItem key={batch.id} value={String(batch.id)}>
                          {batch.course.name} {batch.startYear}-{batch.endYear}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch">
                    Branch <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={branchId !== null ? String(branchId) : ""}
                    onValueChange={(value) => setBranchId(Number(value))}
                  >
                    <SelectTrigger id="branch">
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch.id} value={String(branch.id)}>
                          {branch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
               <div className="space-y-2">
                {courseId}
               </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="guardianName">
                  Guardian Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="guardianName"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guardianPhone">
                  Guardian Phone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="guardianPhone"
                  value={guardianPhone}
                  onChange={(e) => setGuardianPhone(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guardianRelationship">
                  Relationship <span className="text-red-500">*</span>
                </Label>
                <Select value={relationship} onValueChange={setRelationship}>
                  <SelectTrigger id="guardianRelationship">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Father">Father</SelectItem>
                    <SelectItem value="Mother">Mother</SelectItem>
                    <SelectItem value="Brother">Brother</SelectItem>
                    <SelectItem value="Sister">Sister</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={handlePrevStep}>
                Previous
              </Button>
            )}
            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={handleNextStep}
                className="ml-auto"
              >
                Next
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="ml-auto"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

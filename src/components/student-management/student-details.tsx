import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileEdit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  UserCircle,
  Users,
  Droplet,
  Globe,
  User,
} from "lucide-react";
import { GetStudentById } from "@/services/StudentService/StudentService";
import { useEffect, useState } from "react";

interface StudentProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  emergencyContact: string;
  gender: string | null;
  address: string;
  dob: string; // ISO format date string
  regdNo: string;
  rollNo: string;
  bloodGroup: string;
  course: string;
  nationality: string;
  profilePhotoUrl: string | null;
  academicStatus: "PENDING_SECTION_ASSIGNMENT" | string;
  batch: {
    id: number;
    startYear: number;
    endYear: number;
  };
  branch: {
    id: number;
    name: string;
    course: {
      id: number;
      name: string;
    };
  };
  section: string;
  currentSemester: string;
  guardian: {
    guardianName: string;
    guardianPhone: string;
    relationship: string | null;
  };
  createdAt: string | null;
  updatedAt: string | null;
}

// Mock student details - in a real application, this would come from an API

//  {
//   id: id,
//   name: "John Smith",
//   email: "john.smith@university.edu",
//   phone: "9876543210",
//   emergencyContact: "Robert Smith - 9876543211",
//   regdNo: "BTECH2021CSE001",
//   rollNo: "210001",
//   gender: "MALE",
//   batch: { id: 1, name: "2021" },
//   branch: { id: 1, name: "Computer Science" },
//   section: { id: 1, name: "Section A" },
//   currentSemester: { id: 1, name: "Semester 3" },
//   academicStatus: "ACTIVE",
//   bloodGroup: "O+",
//   nationality: "Indian",
//   dob: "May 12, 2003",
//   address: "123 University Housing, Campus Area",
//   guardian: {
//     guardianName: "Robert Smith",
//     guardianPhone: "9876543211",
//     relationship: "Father",
//   },
//   profilePhotoUrl: "/placeholder.svg?height=128&width=128",
//   createdAt: "August 15, 2021",
//   updatedAt: "June 10, 2023",
// }

interface StudentDetailsProps {
  studentId: number | null;
}

export function StudentDetails({ studentId }: StudentDetailsProps) {
  const [student, setStudent] = useState<StudentProfile | null>(null);

  const getMockStudentDetails = async (id: number) => {
    const studentDetail: StudentProfile = await GetStudentById(id);
    console.log(studentDetail);
    return studentDetail;
  };

  useEffect(() => {
    if (studentId) {
      getMockStudentDetails(studentId).then(setStudent);
    }
  }, [studentId]);
  if (!studentId) {
    return (
      <Card className="h-full">
        <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
          <div className="mb-4 rounded-full bg-muted p-6">
            <GraduationCap className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-xl font-medium">No Student Selected</h3>
          <p className="text-sm text-muted-foreground">
            Select a student from the list to view their details.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Badge className="bg-green-500">Active</Badge>;
      case "GRADUATED":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-100"
          >
            Graduated
          </Badge>
        );
      case "SUSPENDED":
        return <Badge variant="destructive">Suspended</Badge>;
      case "ON_LEAVE":
        return (
          <Badge
            variant="outline"
            className="bg-amber-100 text-amber-800 hover:bg-amber-100"
          >
            On Leave
          </Badge>
        );
      case "PENDING_SECTION_ASSIGNMENT":
        return (
          <Badge
            variant="outline"
            className="bg-amber-100 text-amber-800 hover:bg-amber-100"
          >
            Pending For Section Assignment
          </Badge>
        );
      default:
        return null;
    }
  };

  if (!student) {
    return (
      <Card className="h-full">
        <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
          <div className="mb-4 rounded-full bg-muted p-6">
            <GraduationCap className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-xl font-medium">
            Loading Student Details...
          </h3>
          <p className="text-sm text-muted-foreground">
            Please wait while we fetch the student details.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="relative pb-0">
        <Button variant="ghost" size="icon" className="absolute right-4 top-4">
          <FileEdit className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={student.profilePhotoUrl || "/placeholder.svg"}
              alt={student.name}
            />
            <AvatarFallback>
              {student.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 text-center">{student.name}</CardTitle>
          <CardDescription className="text-center">
            {student.regdNo} · {student.rollNo}
          </CardDescription>
          <div className="mt-2">{getStatusBadge(student.academicStatus)}</div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.address}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm">DOB: {student.dob}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-sm font-medium">Guardian Information</h4>
              <div className="rounded-md border p-3">
                <div className="font-medium">
                  {student.guardian.guardianName}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span>{student.guardian.relationship}</span>
                  <span> · </span>
                  <span>{student.guardian.guardianPhone}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-sm font-medium">Academic Information</h4>
              <div className="rounded-md border p-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Branch:</span>
                  <span className="text-sm font-medium">
                    {student.branch.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Batch:</span>
                  <span className="text-sm font-medium">
                    {student.branch.course.name}-{student.batch.startYear}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Section:
                  </span>
                  <span className="text-sm font-medium">
                    {student?.section}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Current Semester:
                  </span>
                  <span className="text-sm font-medium">
                    {student.currentSemester}
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="academic" className="space-y-4 pt-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Academic Details</h4>
              <div className="rounded-md border p-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Registration Number:
                  </span>
                  <span className="text-sm font-medium">{student.regdNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Roll Number:
                  </span>
                  <span className="text-sm font-medium">{student.rollNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Batch:</span>
                  <span className="text-sm font-medium">
                    {student.branch.course.name}-{student.batch.startYear}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Branch:</span>
                  <span className="text-sm font-medium">
                    {student.branch.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Section:
                  </span>
                  <span className="text-sm font-medium">{student.section}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Current Semester:
                  </span>
                  <span className="text-sm font-medium">
                    {student.currentSemester}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Current Courses</h4>
              <div className="text-sm text-muted-foreground">
                Current semester courses would appear here when integrated with
                the actual API.
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Academic History</h4>
              <div className="text-sm text-muted-foreground">
                Previous semester results and course history would appear here
                when integrated with the actual API.
              </div>
            </div>
          </TabsContent>

          <TabsContent value="personal" className="space-y-4 pt-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Personal Information</h4>
              <div className="rounded-md border p-3 space-y-2">
                <div className="flex items-center">
                  <UserCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground mr-2">
                    Name:
                  </span>
                  <span className="text-sm font-medium">{student.name}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground mr-2">
                    Date of Birth:
                  </span>
                  <span className="text-sm font-medium">{student.dob}</span>
                </div>
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground mr-2">
                    Gender:
                  </span>
                  <span className="text-sm font-medium">{student.gender}</span>
                </div>
                <div className="flex items-center">
                  <Droplet className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground mr-2">
                    Blood Group:
                  </span>
                  <span className="text-sm font-medium">
                    {student.bloodGroup}
                  </span>
                </div>
                <div className="flex items-center">
                  <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground mr-2">
                    Nationality:
                  </span>
                  <span className="text-sm font-medium">
                    {student.nationality}
                  </span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground mr-2">
                    Email:
                  </span>
                  <span className="text-sm font-medium">{student.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground mr-2">
                    Phone:
                  </span>
                  <span className="text-sm font-medium">{student.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground mr-2">
                    Address:
                  </span>
                  <span className="text-sm font-medium">{student.address}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Guardian Information</h4>
              <div className="rounded-md border p-3 space-y-2">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground mr-2">
                    Name:
                  </span>
                  <span className="text-sm font-medium">
                    {student.guardian.guardianName}
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground mr-2">
                    Relationship:
                  </span>
                  <span className="text-sm font-medium">
                    {student.guardian.relationship}
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground mr-2">
                    Phone:
                  </span>
                  <span className="text-sm font-medium">
                    {student.guardian.guardianPhone}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Emergency Contact</h4>
              <div className="rounded-md border p-3">
                <div className="text-sm font-medium">
                  {student.emergencyContact}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

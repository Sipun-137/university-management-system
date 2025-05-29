"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Users,
  Heart,
  Shield,
  BookOpen,
  Clock,
  Edit3,
  Download,
  Settings,
  Award,
  Building,
  UserCheck,
  Globe,
  Contact,
} from "lucide-react";
import { useEffect, useState } from "react";
import { IDCardModal } from "@/components/id-card-modal";
import { getMyProfile } from "@/services/StudentService/StudentService";

// Demo student data
interface studentDataI {
  id: number;
  name: string;
  email: string;
  phone: string;
  emergencyContact: string;
  gender: string;
  address: string;
  dob: Date;
  regdNo: string;
  rollNo: string;
  bloodGroup: string;
  course: string;
  nationality: string;
  profilePhotoUrl: string | null;
  academicStatus: string;
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
    relationship: string;
  };
}

export default function StudentProfilePage() {
  const [showIDCardModal, setShowIDCardModal] = useState(false);
  const [student, setStudent] = useState<studentDataI|null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStudentData = async () => {
    const response = await getMyProfile();
    if (response.success) {
      setStudent(response.profile);
    } else {
    }
  };
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const semesterProgress = 25; // Demo progress percentage

  useEffect(() => {
    getStudentData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      {/* <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Student Profile</h1>
              <p className="text-gray-600">Manage your personal information and academic details</p>
            </div>
            <Button size="sm" className="hidden sm:flex">
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Hero Profile Section */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 h-36 relative">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <CardContent className="relative -mt-16 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                  <AvatarImage src={student?.profilePhotoUrl || ""} />
                  <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {getInitials(student?.name || "")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-3xl uppercase font-bold text-gray-900">
                    {student?.name}
                  </h2>
                  <p className="text-lg text-gray-800 font-bold">
                    {student?.rollNo}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <Badge
                      variant="default"
                      className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                    >
                      <GraduationCap className="h-3 w-3 mr-1" />
                      {student?.course}
                    </Badge>
                    <Badge variant="outline">
                      <Users className="h-3 w-3 mr-1" />
                      {student?.section}
                    </Badge>
                    <Badge
                      variant={
                        student?.academicStatus === "ACTIVE"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        student?.academicStatus === "ACTIVE"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : ""
                      }
                    >
                      <UserCheck className="h-3 w-3 mr-1" />
                      {student?.academicStatus}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-blue-800">
                      Current Semester
                    </p>
                    <p className="text-lg font-bold text-blue-900">
                      {student?.currentSemester}
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-purple-800">
                      Branch
                    </p>
                    <p className="text-lg font-bold text-purple-900">
                      {student?.branch.name}
                    </p>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-indigo-800">Batch</p>
                    <p className="text-lg font-bold text-indigo-900">
                      {student?.batch.startYear} -{" "}
                      {student?.batch.endYear}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              Academic Progress
            </CardTitle>
            <CardDescription>
              Your current semester progress and achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Semester Progress</span>
                  <span className="text-sm text-gray-600">
                    {semesterProgress}%
                  </span>
                </div>
                <Progress value={semesterProgress} className="h-2" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">85%</p>
                  <p className="text-xs text-green-700">Attendance</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">8.5</p>
                  <p className="text-xs text-blue-700">CGPA</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">12</p>
                  <p className="text-xs text-purple-700">Credits</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">6</p>
                  <p className="text-xs text-orange-700">Subjects</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Information Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Personal Information
              </CardTitle>
              <CardDescription>Your basic personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="h-4 w-4 text-gray-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-600 truncate">
                    {student?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="h-4 w-4 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Phone</p>
                  <p className="text-sm text-gray-600">{student?.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Date of Birth
                  </p>
                  <p className="text-sm text-gray-600">
                    {student?.dob ? formatDate(student.dob.toString()) : "N/A"} (
                    {student?.dob ? calculateAge(student.dob.toString()) : "N/A"} years)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Shield className="h-4 w-4 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Gender</p>
                  <p className="text-sm text-gray-600">{student?.gender}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Heart className="h-4 w-4 text-red-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Blood Group
                  </p>
                  <p className="text-sm text-gray-600">
                    {student?.bloodGroup}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Globe className="h-4 w-4 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Nationality
                  </p>
                  <p className="text-sm text-gray-600">
                    {student?.nationality}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic & Contact Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Academic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-green-600" />
                  Academic Information
                </CardTitle>
                <CardDescription>
                  Your course and academic details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-800">
                        Registration Number
                      </p>
                      <p className="text-lg font-bold text-green-900">
                        {student?.regdNo}
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">
                        Course
                      </p>
                      <p className="text-lg font-bold text-blue-900">
                        {student?.course}
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm font-medium text-purple-800">
                        Branch
                      </p>
                      <p className="text-lg font-bold text-purple-900">
                        {student?.branch.name}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <p className="text-sm font-medium text-indigo-800">
                        Section
                      </p>
                      <p className="text-lg font-bold text-indigo-900">
                        {student?.section}
                      </p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <p className="text-sm font-medium text-orange-800">
                        Current Semester
                      </p>
                      <p className="text-lg font-bold text-orange-900">
                        {student?.currentSemester}
                      </p>
                    </div>
                    <div className="p-3 bg-teal-50 rounded-lg">
                      <p className="text-sm font-medium text-teal-800">Batch</p>
                      <p className="text-lg font-bold text-teal-900">
                        {student?.batch.startYear} -{" "}
                        {student?.batch.endYear}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guardian & Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Contact className="h-5 w-5 text-orange-600" />
                  Guardian & Emergency Contact
                </CardTitle>
                <CardDescription>
                  Important contact information for emergencies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 border-b pb-2">
                      Guardian Information
                    </h4>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <User className="h-4 w-4 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium text-orange-800">
                          Guardian Name
                        </p>
                        <p className="text-sm text-orange-700">
                          {student?.guardian.guardianName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <Phone className="h-4 w-4 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium text-orange-800">
                          Guardian Phone
                        </p>
                        <p className="text-sm text-orange-700">
                          {student?.guardian.guardianPhone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <Users className="h-4 w-4 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium text-orange-800">
                          Relationship
                        </p>
                        <p className="text-sm text-orange-700">
                          {student?.guardian.relationship}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 border-b pb-2">
                      Emergency Contact
                    </h4>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <Phone className="h-4 w-4 text-red-600" />
                      <div>
                        <p className="text-sm font-medium text-red-800">
                          Emergency Number
                        </p>
                        <p className="text-sm text-red-700">
                          {student?.emergencyContact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              Address Information
            </CardTitle>
            <CardDescription>Your current residential address</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-purple-900 font-medium">
                {student?.address}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Manage your profile and access related features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link href="/dashboard/student/attendance">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-auto p-3 flex-col gap-2"
                >
                  <BookOpen className="h-5 w-5" />
                  <span className="text-xs">View Attendance</span>
                </Button>
              </Link>
              <Link href="/dashboard/my-timetable">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-auto p-3 flex-col gap-2"
                >
                  <Clock className="h-5 w-5" />
                  <span className="text-xs">View Timetable</span>
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="w-full h-auto p-3 flex-col gap-2"
                onClick={() => setShowIDCardModal(true)}
              >
                <Download className="h-5 w-5" />
                <span className="text-xs">Download ID Card</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full h-auto p-3 flex-col gap-2"
              >
                <Settings className="h-5 w-5" />
                <span className="text-xs">Account Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        {student && (
          <IDCardModal
            isOpen={showIDCardModal}
            onClose={() => setShowIDCardModal(false)}
            studentData={student}
          />
        )}
      </div>
    </div>
  );
}

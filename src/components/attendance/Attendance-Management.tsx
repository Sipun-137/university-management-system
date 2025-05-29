"use client";

import { useState } from "react";
import {
  CalendarIcon,
  Download,
  Filter,
  Search,
  Users,
  BookOpen,
  Clock,
  Edit3,
  BarChart3,
  ChevronDown,
  ArrowUpDown,
  CalendarPlus2Icon as CalendarIcon2,
  CheckCircle2,
  XCircle,
  PieChart,
  UserCheck,
  FileBarChart,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

export default function AttendanceAdmin() {
  const [activeTab, setActiveTab] = useState("university");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  // Mock data for demonstration
  const universityStats = {
    totalStudents: 15420,
    averageAttendance: 87.5,
    totalSessions: 2340,
    presentToday: 13245,
    trend: "+2.1%",
  };

  const subjectWiseData = [
    { subject: "Mathematics", attendance: 92.3, sessions: 45, students: 1200 },
    { subject: "Physics", attendance: 88.7, sessions: 42, students: 1150 },
    { subject: "Chemistry", attendance: 85.2, sessions: 40, students: 1100 },
    {
      subject: "Computer Science",
      attendance: 94.1,
      sessions: 48,
      students: 800,
    },
    { subject: "English", attendance: 79.8, sessions: 35, students: 1400 },
  ];

  const studentData = [
    {
      date: "2024-01-15",
      subject: "Mathematics",
      status: "Present",
      faculty: "Dr. Smith",
      period: "1",
    },
    {
      date: "2024-01-15",
      subject: "Physics",
      status: "Absent",
      faculty: "Dr. Johnson",
      period: "2",
    },
    {
      date: "2024-01-15",
      subject: "Chemistry",
      status: "Present",
      faculty: "Dr. Brown",
      period: "3",
    },
    {
      date: "2024-01-16",
      subject: "Mathematics",
      status: "Present",
      faculty: "Dr. Smith",
      period: "1",
    },
    {
      date: "2024-01-16",
      subject: "Computer Science",
      status: "Present",
      faculty: "Dr. Wilson",
      period: "4",
    },
  ];

  const sessionData = [
    {
      date: "2024-01-15",
      subject: "Mathematics",
      faculty: "Dr. Smith",
      section: "CSE-A",
      shift: "Morning",
      period: "1",
      present: 45,
      total: 50,
    },
    {
      date: "2024-01-15",
      subject: "Physics",
      faculty: "Dr. Johnson",
      section: "CSE-B",
      shift: "Morning",
      period: "2",
      present: 42,
      total: 48,
    },
    {
      date: "2024-01-15",
      subject: "Chemistry",
      faculty: "Dr. Brown",
      section: "ECE-A",
      shift: "Afternoon",
      period: "3",
      present: 38,
      total: 45,
    },
    {
      date: "2024-01-16",
      subject: "Computer Science",
      faculty: "Dr. Wilson",
      section: "CSE-A",
      shift: "Morning",
      period: "4",
      present: 47,
      total: 50,
    },
  ];

  const correctionStudents = [
    {
      id: "CS001",
      name: "John Doe",
      rollNo: "21CS001",
      currentStatus: "Present",
      avatar: "JD",
    },
    {
      id: "CS002",
      name: "Jane Smith",
      rollNo: "21CS002",
      currentStatus: "Absent",
      avatar: "JS",
    },
    {
      id: "CS003",
      name: "Mike Johnson",
      rollNo: "21CS003",
      currentStatus: "Present",
      avatar: "MJ",
    },
    {
      id: "CS004",
      name: "Sarah Wilson",
      rollNo: "21CS004",
      currentStatus: "Present",
      avatar: "SW",
    },
    {
      id: "CS005",
      name: "David Brown",
      rollNo: "21CS005",
      currentStatus: "Absent",
      avatar: "DB",
    },
  ];

  const recentActivity = [
    {
      action: "Attendance Updated",
      user: "Admin",
      time: "10 minutes ago",
      details: "Updated Physics attendance for CSE-A",
    },
    {
      action: "Record Corrected",
      user: "Dr. Smith",
      time: "2 hours ago",
      details: "Corrected attendance for John Doe",
    },
    {
      action: "Report Generated",
      user: "System",
      time: "Yesterday",
      details: "Monthly attendance report generated",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}

      <div className="container mx-auto px-4 py-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <div className="flex justify-between items-center mb-4">
            <TabsList className="bg-white border shadow-sm">
              <TabsTrigger
                value="university"
                className="flex items-center gap-2 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">University Summary</span>
                <span className="sm:hidden">Summary</span>
              </TabsTrigger>
              <TabsTrigger
                value="student"
                className="flex items-center gap-2 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Student-wise</span>
                <span className="sm:hidden">Student</span>
              </TabsTrigger>
              <TabsTrigger
                value="section"
                className="flex items-center gap-2 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Section-wise</span>
                <span className="sm:hidden">Section</span>
              </TabsTrigger>
              <TabsTrigger
                value="session"
                className="flex items-center gap-2 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700"
              >
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">Session-wise</span>
                <span className="sm:hidden">Session</span>
              </TabsTrigger>
              <TabsTrigger
                value="correction"
                className="flex items-center gap-2 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700"
              >
                <Edit3 className="h-4 w-4" />
                <span className="hidden sm:inline">Attendance Correction</span>
                <span className="sm:hidden">Correction</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <FileBarChart className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* University-wise Summary Tab */}
          <TabsContent value="university" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">From Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from
                            ? format(dateRange.from, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateRange.from}
                          onSelect={(date) =>
                            setDateRange((prev) => ({ ...prev, from: date }))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">To Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.to
                            ? format(dateRange.to, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateRange.to}
                          onSelect={(date) =>
                            setDateRange((prev) => ({ ...prev, to: date }))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Branch</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cse">Computer Science</SelectItem>
                        <SelectItem value="ece">Electronics</SelectItem>
                        <SelectItem value="mech">Mechanical</SelectItem>
                        <SelectItem value="civil">Civil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Semester</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Semester 1</SelectItem>
                        <SelectItem value="2">Semester 2</SelectItem>
                        <SelectItem value="3">Semester 3</SelectItem>
                        <SelectItem value="4">Semester 4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Subject</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="cs">Computer Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Search className="h-4 w-4 mr-2" />
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-none shadow-md overflow-hidden">
                <CardHeader className="pb-2 pt-6">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Total Students
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-bold">
                        {universityStats.totalStudents.toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Across all branches
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md overflow-hidden">
                <CardHeader className="pb-2 pt-6">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Average Attendance
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-bold">
                        {universityStats.averageAttendance}%
                      </div>
                      <p className="text-xs text-green-600 font-medium mt-1">
                        {universityStats.trend} from last month
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md overflow-hidden">
                <CardHeader className="pb-2 pt-6">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Total Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-bold">
                        {universityStats.totalSessions}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        This semester
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md overflow-hidden">
                <CardHeader className="pb-2 pt-6">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Present Today
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-bold">
                        {universityStats.presentToday.toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        86% attendance rate
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                      <UserCheck className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Subject-wise Data Table */}
              <Card className="border-none shadow-md lg:col-span-2">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
                  <CardTitle className="text-blue-800">
                    Subject-wise Attendance Summary
                  </CardTitle>
                  <CardDescription>
                    Attendance statistics by subject across the university
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[180px]">Subject</TableHead>
                        <TableHead>Attendance %</TableHead>
                        <TableHead className="text-right">Sessions</TableHead>
                        <TableHead className="text-right">Students</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subjectWiseData.map((subject, index) => (
                        <TableRow key={index} className="hover:bg-slate-50">
                          <TableCell className="font-medium">
                            {subject.subject}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Progress
                                value={subject.attendance}
                                className="h-2"
                              />
                              <span className="text-sm font-medium w-12">
                                {subject.attendance}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {subject.sessions}
                          </TableCell>
                          <TableCell className="text-right">
                            {subject.students}
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge
                              variant="outline"
                              className={
                                subject.attendance >= 90
                                  ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                                  : subject.attendance >= 80
                                  ? "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200"
                                  : "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                              }
                            >
                              {subject.attendance >= 90
                                ? "Excellent"
                                : subject.attendance >= 80
                                ? "Good"
                                : "Needs Attention"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-none shadow-md">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-t-lg">
                  <CardTitle className="text-purple-800">
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Latest updates and changes</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-4 p-4">
                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                          {activity.action.includes("Updated") ? (
                            <Edit3 className="h-4 w-4 text-amber-600" />
                          ) : activity.action.includes("Corrected") ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <FileBarChart className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {activity.action}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.details}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {activity.user} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50 px-4 py-3">
                  <Button variant="ghost" size="sm" className="w-full text-sm">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Student-wise Attendance Tab */}
          <TabsContent value="student" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Filter className="h-5 w-5" />
                  Student Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Batch <span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select batch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2021">2021-2025</SelectItem>
                        <SelectItem value="2022">2022-2026</SelectItem>
                        <SelectItem value="2023">2023-2027</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Branch <span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cse">Computer Science</SelectItem>
                        <SelectItem value="ece">Electronics</SelectItem>
                        <SelectItem value="mech">Mechanical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Semester <span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Semester 1</SelectItem>
                        <SelectItem value="2">Semester 2</SelectItem>
                        <SelectItem value="3">Semester 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Section <span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a">Section A</SelectItem>
                        <SelectItem value="b">Section B</SelectItem>
                        <SelectItem value="c">Section C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Student ID <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input placeholder="Enter student ID" />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-0 top-0 h-full"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Subject</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Search className="h-4 w-4 mr-2" />
                    Search Student
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Student Summary */}
            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 pb-0">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Avatar className="h-10 w-10 border-2 border-white">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          JD
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        John Doe{" "}
                        <span className="text-sm font-normal text-gray-500">
                          (21CS001)
                        </span>
                      </div>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Computer Science Engineering • Semester 3 • Section A
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Actions
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Full Profile</DropdownMenuItem>
                      <DropdownMenuItem>
                        Download Attendance Report
                      </DropdownMenuItem>
                      <DropdownMenuItem>Send Notification</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-green-50 to-green-100 p-6">
                    <div className="absolute right-0 top-0 h-24 w-24 translate-x-1/3 -translate-y-1/3 transform rounded-full bg-green-200 opacity-20"></div>
                    <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-1/3 translate-y-1/3 transform rounded-full bg-green-200 opacity-20"></div>
                    <div className="relative">
                      <div className="text-3xl font-bold text-green-600">
                        87.5%
                      </div>
                      <div className="text-sm text-green-700 mt-1">
                        Overall Attendance
                      </div>
                      <div className="mt-4 text-xs text-green-600">
                        <span className="font-medium">Good standing</span> •
                        Above minimum requirement
                      </div>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-blue-50 to-blue-100 p-6">
                    <div className="absolute right-0 top-0 h-24 w-24 translate-x-1/3 -translate-y-1/3 transform rounded-full bg-blue-200 opacity-20"></div>
                    <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-1/3 translate-y-1/3 transform rounded-full bg-blue-200 opacity-20"></div>
                    <div className="relative">
                      <div className="text-3xl font-bold text-blue-600">
                        35/40
                      </div>
                      <div className="text-sm text-blue-700 mt-1">
                        Classes Attended
                      </div>
                      <div className="mt-4 text-xs text-blue-600">
                        <span className="font-medium">Last attended:</span>{" "}
                        Yesterday
                      </div>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-amber-50 to-amber-100 p-6">
                    <div className="absolute right-0 top-0 h-24 w-24 translate-x-1/3 -translate-y-1/3 transform rounded-full bg-amber-200 opacity-20"></div>
                    <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-1/3 translate-y-1/3 transform rounded-full bg-amber-200 opacity-20"></div>
                    <div className="relative">
                      <div className="text-3xl font-bold text-amber-600">5</div>
                      <div className="text-sm text-amber-700 mt-1">
                        Classes Missed
                      </div>
                      <div className="mt-4 text-xs text-amber-600">
                        <span className="font-medium">Most missed:</span>{" "}
                        Physics
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">
                    Subject-wise Attendance
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="font-medium">Mathematics</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-100 rounded-full h-2.5">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{ width: "95%" }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">95%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="font-medium">Computer Science</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-100 rounded-full h-2.5">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{ width: "92%" }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                        <span className="font-medium">Chemistry</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-100 rounded-full h-2.5">
                          <div
                            className="bg-amber-500 h-2.5 rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <span className="font-medium">Physics</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-100 rounded-full h-2.5">
                          <div
                            className="bg-red-500 h-2.5 rounded-full"
                            style={{ width: "78%" }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Attendance */}
            <Card className="border-none shadow-md">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100">
                <div className="flex items-center justify-between">
                  <CardTitle>Detailed Attendance Record</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <CalendarIcon2 className="h-4 w-4 mr-2" />
                      Filter by Date
                    </Button>
                    <Button variant="outline" size="sm">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      Sort
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent bg-slate-50">
                      <TableHead>Date</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Faculty</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentData.map((record, index) => (
                      <TableRow key={index} className="hover:bg-slate-50">
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.subject}</TableCell>
                        <TableCell>{record.faculty}</TableCell>
                        <TableCell>{record.period}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              record.status === "Present"
                                ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                                : "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                            }
                          >
                            <div className="flex items-center gap-1">
                              {record.status === "Present" ? (
                                <CheckCircle2 className="h-3 w-3" />
                              ) : (
                                <XCircle className="h-3 w-3" />
                              )}
                              {record.status}
                            </div>
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex items-center justify-between bg-slate-50 px-6 py-3">
                <div className="text-sm text-gray-500">
                  Showing 5 of 40 records
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Section-wise Attendance Tab */}
          <TabsContent value="section" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <Filter className="h-5 w-5" />
                  Section Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Batch <span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select batch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2021">2021-2025</SelectItem>
                        <SelectItem value="2022">2022-2026</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Branch <span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cse">Computer Science</SelectItem>
                        <SelectItem value="ece">Electronics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Semester <span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Semester 1</SelectItem>
                        <SelectItem value="2">Semester 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Section <span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a">Section A</SelectItem>
                        <SelectItem value="b">Section B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button className="bg-amber-600 hover:bg-amber-700">
                    <Search className="h-4 w-4 mr-2" />
                    Analyze Section
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Section Header */}
            <div className="bg-white rounded-lg border shadow-md p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">CSE-A • Semester 3</h2>
                  <p className="text-gray-500">
                    Computer Science Engineering • 2021-2025 Batch
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center px-4 py-2 bg-slate-100 rounded-md">
                    <div className="text-sm text-gray-500">Total Students</div>
                    <div className="text-xl font-bold">50</div>
                  </div>
                  <div className="text-center px-4 py-2 bg-green-100 rounded-md">
                    <div className="text-sm text-green-700">
                      Avg. Attendance
                    </div>
                    <div className="text-xl font-bold text-green-700">
                      89.2%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-none shadow-md">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-slate-600" />
                    Section Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Students:</span>
                      <span className="font-semibold">50</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Attendance:</span>
                      <span className="font-semibold text-green-600">
                        89.2%
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Best Subject:</span>
                      <span className="font-semibold text-green-600">
                        Mathematics
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Needs Attention:</span>
                      <span className="font-semibold text-red-600">
                        Physics
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Top Student:</span>
                      <span className="font-semibold">John Doe (98%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                  <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
                    <CalendarIcon2 className="h-5 w-5" />
                    Daily Trends
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                    ].map((day, index) => {
                      const attendance = [92, 88, 90, 87, 85][index];
                      return (
                        <div key={day} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">{day}:</span>
                            <span className="font-semibold">{attendance}%</span>
                          </div>
                          <Progress value={attendance} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                  <CardTitle className="text-lg flex items-center gap-2 text-purple-800">
                    <Clock className="h-5 w-5" />
                    Period Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((period) => {
                      const attendance = [94, 91, 88, 85, 82][period - 1];
                      return (
                        <div key={period} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Period {period}:</span>
                            <span className="font-semibold">{attendance}%</span>
                          </div>
                          <Progress
                            value={attendance}
                            className={
                              "h-2 " +
                              (attendance > 90
                                ? "bg-green-600"
                                : attendance > 85
                                ? "bg-blue-600"
                                : attendance > 80
                                ? "bg-amber-600"
                                : "bg-red-600")
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Student List */}
            <Card className="border-none shadow-md">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100">
                <div className="flex items-center justify-between">
                  <CardTitle>Students in Section</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search students..." className="pl-8" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent bg-slate-50">
                      <TableHead>Roll No</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Attendance %</TableHead>
                      <TableHead>Classes Attended</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {correctionStudents.map((student, index) => (
                      <TableRow key={index} className="hover:bg-slate-50">
                        <TableCell className="font-medium">
                          {student.rollNo}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{student.avatar}</AvatarFallback>
                            </Avatar>
                            {student.name}
                          </div>
                        </TableCell>
                        <TableCell>{[98, 85, 92, 90, 78][index]}%</TableCell>
                        <TableCell>{[39, 34, 37, 36, 31][index]}/40</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              index === 0 || index === 2 || index === 3
                                ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                                : index === 1
                                ? "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200"
                                : "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                            }
                          >
                            {index === 0
                              ? "Excellent"
                              : index === 1 || index === 2 || index === 3
                              ? "Good"
                              : "At Risk"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex items-center justify-between bg-slate-50 px-6 py-3">
                <div className="text-sm text-gray-500">
                  Showing 5 of 50 students
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Session-wise Attendance Tab */}
          <TabsContent value="session" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Filter className="h-5 w-5" />
                  Session Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      From Date <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          Pick a date
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      To Date <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          Pick a date
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Faculty</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select faculty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="smith">Dr. Smith</SelectItem>
                        <SelectItem value="johnson">Dr. Johnson</SelectItem>
                        <SelectItem value="brown">Dr. Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Subject</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Search className="h-4 w-4 mr-2" />
                    Search Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Session Records</CardTitle>
                    <CardDescription>
                      Individual class sessions and attendance data
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      Sort
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent bg-slate-50">
                      <TableHead>Date</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Faculty</TableHead>
                      <TableHead>Section</TableHead>
                      <TableHead>Shift</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessionData.map((session, index) => {
                      const percentage = Math.round(
                        (session.present / session.total) * 100
                      );
                      return (
                        <TableRow key={index} className="hover:bg-slate-50">
                          <TableCell>{session.date}</TableCell>
                          <TableCell>{session.subject}</TableCell>
                          <TableCell>{session.faculty}</TableCell>
                          <TableCell>{session.section}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                session.shift === "Morning"
                                  ? "bg-blue-50 text-blue-800 hover:bg-blue-50 border-blue-200"
                                  : "bg-amber-50 text-amber-800 hover:bg-amber-50 border-amber-200"
                              }
                            >
                              {session.shift}
                            </Badge>
                          </TableCell>
                          <TableCell>{session.period}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="text-sm font-medium">
                                {session.present}/{session.total}
                              </div>
                              <div className="flex items-center gap-1">
                                <Progress
                                  value={percentage}
                                  className={
                                    "h-2 w-16 " +
                                    (percentage >= 90
                                      ? "bg-green-600"
                                      : percentage >= 80
                                      ? "bg-blue-600"
                                      : percentage >= 70
                                      ? "bg-amber-600"
                                      : "bg-red-600")
                                  }
                                />
                                <span className="text-xs font-medium">
                                  {percentage}%
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Actions
                                  <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Edit Attendance
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Download Report
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex items-center justify-between bg-slate-50 px-6 py-3">
                <div className="text-sm text-gray-500">
                  Showing 4 of 120 sessions
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Attendance Correction Tab */}
          <TabsContent value="correction" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <Filter className="h-5 w-5" />
                  Session Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Date <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          Select date
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Subject <span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Section <span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a">Section A</SelectItem>
                        <SelectItem value="b">Section B</SelectItem>
                        <SelectItem value="c">Section C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Period</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Period 1</SelectItem>
                        <SelectItem value="2">Period 2</SelectItem>
                        <SelectItem value="3">Period 3</SelectItem>
                        <SelectItem value="4">Period 4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Search className="h-4 w-4 mr-2" />
                    Load Session
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      Edit Attendance - Mathematics, Section A, Period 1
                    </CardTitle>
                    <CardDescription>
                      January 15, 2024 - Dr. Smith
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-800 border-blue-200"
                    >
                      50 Students
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-800 border-green-200"
                    >
                      45 Present
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border">
                    <span className="font-medium">Bulk Actions:</span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Mark All Present
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Mark All Absent
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent bg-slate-50">
                          <TableHead>Roll No</TableHead>
                          <TableHead>Student Name</TableHead>
                          <TableHead>Current Status</TableHead>
                          <TableHead>Update Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
                        {correctionStudents.map((student, index) => (
                          <TableRow
                            key={student.id}
                            className="hover:bg-slate-50"
                          >
                            <TableCell className="font-medium">
                              {student.rollNo}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                                    {student.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">
                                  {student.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  student.currentStatus === "Present"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                                    : "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                                }
                              >
                                <div className="flex items-center gap-1">
                                  {student.currentStatus === "Present" ? (
                                    <CheckCircle2 className="h-3 w-3" />
                                  ) : (
                                    <XCircle className="h-3 w-3" />
                                  )}
                                  {student.currentStatus}
                                </div>
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-4">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name={`status-${student.id}`}
                                    value="present"
                                    className="text-green-600 focus:ring-green-500"
                                  />
                                  <span className="text-sm text-green-700 font-medium">
                                    Present
                                  </span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name={`status-${student.id}`}
                                    value="absent"
                                    className="text-red-600 focus:ring-red-500"
                                  />
                                  <span className="text-sm text-red-700 font-medium">
                                    Absent
                                  </span>
                                </label>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              >
                                View History
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <Separator />

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">!</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-amber-800">
                          Important Notice
                        </p>
                        <p className="text-xs text-amber-700 mt-1">
                          Changes will be logged with timestamp and admin
                          details. This action cannot be undone.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="border-gray-300">
                        Cancel
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

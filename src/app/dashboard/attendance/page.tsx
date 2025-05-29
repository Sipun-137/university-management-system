"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, BookOpen, Calendar } from "lucide-react";
import { AttendanceForm } from "@/components/academic/attendance-form";
import { getFacultyTodayAttendanceSchedule, TakeAttendance } from "@/services/attendanceService/AttendacneService";

// Types matching your DTO structure
interface StudentStatusDTO {
  studentId: number;
  status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";
  remarks: string;
}

interface AttendanceRequest {
  sectionId: number;
  subjectId: number;
  semesterId: number;
  date: string; // LocalDate format
  period: number;
  shift: "MORNING" | "AFTERNOON";
  studentAttendance: StudentStatusDTO[];
}

// Course Interface
interface Course {
  id: number;
  name: string;
}

// Branch Interface
interface Branch {
  id: number;
  name: string;
  course: Course;
}

// Semester Interface
interface Semester {
  id: number;
  number: number;
  current: boolean;
  branch: Branch;
}

// Subject Interface
interface Subject {
  id: number;
  name: string;
  subjectCode: string;
  weeklyHours: number;
}

// Section Interface
interface Section {
  id: number;
  name: string;
  maxStrength: number;
  currentStrength: number;
}

// TimeSlot Interface
interface TimeSlot {
  day: string; // e.g., "MONDAY"
  period: number;
  startTime: string; // e.g., "08:00"
  endTime: string; // e.g., "09:00"
  shift: string; // e.g., "MORNING"
}

// Main Object Interface
export interface ScheduleEntry {
  subject: Subject;
  section: Section;
  branchName: string;
  semester: Semester;
  timeSlot: TimeSlot;
  attendanceTaken: boolean;
}

export default function AttendanceDashboard() {
  const [todayClasses, setTodayClasses] = useState<ScheduleEntry[]>([]);
  const [selectedClass, setSelectedClass] = useState<ScheduleEntry | null>(
    null
  );
  
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchTodayClasses = async () => {
    const listofClasses = await getFacultyTodayAttendanceSchedule();
    setTodayClasses(listofClasses);
  };

  useEffect(() => {
    fetchTodayClasses();
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);



  

  const getCurrentClassStatus = (classItem: ScheduleEntry) => {
    const now = currentTime;
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    const [startHour, startMinute] = classItem.timeSlot.startTime
      .split(":")
      .map(Number);
    const [endHour, endMinute] = classItem.timeSlot.endTime
      .split(":")
      .map(Number);

    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;

    if (currentTimeInMinutes < startTimeInMinutes) return "upcoming";
    if (
      currentTimeInMinutes >= startTimeInMinutes &&
      currentTimeInMinutes <= endTimeInMinutes
    )
      return "current";
    return "past";
  };

  const getStatusBadge = (classItem: ScheduleEntry) => {
    const status = getCurrentClassStatus(classItem);

    if (classItem.attendanceTaken) {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Completed
        </Badge>
      );
    }

    switch (status) {
      case "current":
        return (
          <Badge
            variant="default"
            className="bg-blue-100 text-blue-800 animate-pulse"
          >
            Live Now
          </Badge>
        );
      case "upcoming":
        return <Badge variant="outline">Upcoming</Badge>;
      case "past":
        return (
          <Badge
            variant="destructive"
            className="bg-orange-100 text-orange-800"
          >
            Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleTakeAttendance = (classItem: ScheduleEntry) => {
    setSelectedClass(classItem);
  };

  const handleAttendanceSubmit = async (attendanceData: AttendanceRequest) => {
    try {
      const response =await TakeAttendance(attendanceData);
      console.log(response);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      fetchTodayClasses();
      setSelectedClass(null);
      return { success: true };
    } catch (error) {
      console.error("Error submitting attendance:", error);
      return { success: false, error: "Failed to submit attendance" };
    }
  };

  if (selectedClass) {
    return (
      <AttendanceForm
        classData={selectedClass}
        onSubmit={handleAttendanceSubmit}
        onCancel={() => setSelectedClass(null)}
      />
    );
  }

  return (
    <div className=" bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Faculty Attendance Dashboard
          </h1>
          <p className="text-gray-600">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Today's Classes */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Today&apos;s Classes
          </h2>

          {todayClasses.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No classes scheduled for today</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {todayClasses.map((classItem, index) => {
                const status = getCurrentClassStatus(classItem);
                const isCurrentClass = status === "current";

                return (
                  <Card
                    key={index}
                    className={`transition-all duration-200 hover:shadow-lg ${
                      isCurrentClass ? "ring-2 ring-blue-500 shadow-lg" : ""
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-semibold">
                          {classItem.subject.name}
                        </CardTitle>
                        {getStatusBadge(classItem)}
                      </div>
                      <p className="text-sm text-gray-600">
                        Section: {classItem.section.name}
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {classItem.timeSlot.startTime} -{" "}
                            {classItem.timeSlot.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {/* <span>{classItem.studentCount}</span> */}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <BookOpen className="w-4 h-4" />
                        <span>
                          Period {classItem.timeSlot.period} •{" "}
                          {classItem.timeSlot.shift}
                        </span>
                      </div>

                      <Button
                        onClick={() => handleTakeAttendance(classItem)}
                        disabled={classItem.attendanceTaken}
                        className="w-full mt-4"
                        variant={
                          classItem.attendanceTaken ? "secondary" : "default"
                        }
                      >
                        {classItem.attendanceTaken
                          ? "Attendance Completed"
                          : "Take Attendance"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Classes Today</p>
                  <p className="text-2xl font-bold">{todayClasses.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Attendance Completed</p>
                  <p className="text-2xl font-bold">
                    {todayClasses.filter((c) => c.attendanceTaken).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending Classes</p>
                  <p className="text-2xl font-bold">
                    {todayClasses.filter((c) => !c.attendanceTaken).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

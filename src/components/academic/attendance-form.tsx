"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Search,
  Users,
  Clock,
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertCircle,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { ScheduleEntry } from "@/app/dashboard/attendance/page";
import { getStudentsBySection } from "@/services/StudentService/StudentService";

interface Student {
  id: number;
  name: string;
  rollNo: string;
  attendanceStatus: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";
  remarks: string;
}

interface StudentStatusDTO {
  studentId: number;
  status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";
  remarks: string;
}

interface AttendanceRequest {
  sectionId: number;
  subjectId: number;
  semesterId: number;
  date: string;
  period: number;
  shift: "MORNING" | "AFTERNOON";
  studentAttendance: StudentStatusDTO[];
}

interface AttendanceFormProps {
  classData: ScheduleEntry;
  onSubmit: (
    data: AttendanceRequest
  ) => Promise<{ success: boolean; error?: string }>;
  onCancel: () => void;
}

const STUDENTS_PER_PAGE = 20;

export function AttendanceForm({
  classData,
  onSubmit,
  onCancel,
}: AttendanceFormProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStudents = async (sectionId: number, semesterId: number) => {
    const studentData = await getStudentsBySection(sectionId, semesterId);
    setStudents(studentData);
  };

  const totalPages = Math.ceil(filteredStudents.length / STUDENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * STUDENTS_PER_PAGE;
  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + STUDENTS_PER_PAGE
  );

  const updateStudentStatus = (
    studentId: number,
    status: Student["attendanceStatus"]
  ) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? { ...student, attendanceStatus: status }
          : student
      )
    );
  };

  const updateStudentRemarks = (studentId: number, remarks: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, remarks } : student
      )
    );
  };

  const markAllPresent = () => {
    setStudents((prev) =>
      prev.map((student) => ({
        ...student,
        attendanceStatus: "PRESENT" as const,
      }))
    );
  };

  const markAllAbsent = () => {
    setStudents((prev) =>
      prev.map((student) => ({
        ...student,
        attendanceStatus: "ABSENT" as const,
      }))
    );
  };

  const markPagePresent = () => {
    const pageStudentIds = paginatedStudents.map((s) => s.id);
    setStudents((prev) =>
      prev.map((student) =>
        pageStudentIds.includes(student.id)
          ? { ...student, attendanceStatus: "PRESENT" as const }
          : student
      )
    );
  };

  const markPageAbsent = () => {
    const pageStudentIds = paginatedStudents.map((s) => s.id);
    setStudents((prev) =>
      prev.map((student) =>
        pageStudentIds.includes(student.id)
          ? { ...student, attendanceStatus: "ABSENT" as const }
          : student
      )
    );
  };

  const getStatusIcon = (status: Student["attendanceStatus"]) => {
    switch (status) {
      case "PRESENT":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "ABSENT":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "LATE":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case "EXCUSED":
        return <UserCheck className="w-4 h-4 text-blue-600" />;
    }
  };

  const getStatusColor = (status: Student["attendanceStatus"]) => {
    switch (status) {
      case "PRESENT":
        return "bg-green-100 text-green-800 border-green-200";
      case "ABSENT":
        return "bg-red-100 text-red-800 border-red-200";
      case "LATE":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "EXCUSED":
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getAttendanceStats = () => {
    const present = students.filter(
      (s) => s.attendanceStatus === "PRESENT"
    ).length;
    const absent = students.filter(
      (s) => s.attendanceStatus === "ABSENT"
    ).length;
    const late = students.filter((s) => s.attendanceStatus === "LATE").length;
    const excused = students.filter(
      (s) => s.attendanceStatus === "EXCUSED"
    ).length;

    return { present, absent, late, excused, total: students.length };
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // check all studnt statuses are set
    if (students.some((student) => !student.attendanceStatus)) {
      toast.error("Please mark attendance for all students before submitting.");
      setIsSubmitting(false);
      return;
    }

    try {
      const attendanceData: AttendanceRequest = {
        sectionId: classData.section.id,
        subjectId: classData.subject.id,
        semesterId: classData.semester.id,
        date: new Date().toISOString().split("T")[0],
        period: classData.timeSlot.period,
        shift: classData.timeSlot.shift as "MORNING" | "AFTERNOON",
        studentAttendance: students.map((student) => ({
          studentId: student.id,
          status: student.attendanceStatus,
          remarks: student.remarks || "",
        })),
      };

      const result = await onSubmit(attendanceData);

      if (result.success) {
        toast.success("Attendance Submitted Successfully!");
      } else {
        toast.error("Failed to submit attendance. Please try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = getAttendanceStats();

  useEffect(() => {
    getStudents(classData.section.id, classData.semester.id);
  }, [classData]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Toaster position="bottom-left"/>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={onCancel} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">
                    {classData.subject.name}
                  </CardTitle>
                  <p className="text-gray-600 mt-1">
                    Section: {classData.section.name}
                  </p>
                </div>
                <Badge variant="outline" className="text-sm">
                  {new Date().toLocaleDateString()}
                </Badge>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600 mt-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    {classData.timeSlot.startTime} -{" "}
                    {classData.timeSlot.endTime}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>
                    Period {classData.timeSlot.period} •{" "}
                    {classData.timeSlot.shift}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {/* <span>{classData.studentCount} Students</span> */}
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Attendance Stats */}
        <div className="grid gap-4 md:grid-cols-5 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.present}
              </div>
              <div className="text-sm text-gray-600">Present</div>
              <div className="text-xs text-gray-500">
                {((stats.present / stats.total) * 100).toFixed(1)}%
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {stats.absent}
              </div>
              <div className="text-sm text-gray-600">Absent</div>
              <div className="text-xs text-gray-500">
                {((stats.absent / stats.total) * 100).toFixed(1)}%
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {stats.late}
              </div>
              <div className="text-sm text-gray-600">Late</div>
              <div className="text-xs text-gray-500">
                {((stats.late / stats.total) * 100).toFixed(1)}%
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats.excused}
              </div>
              <div className="text-sm text-gray-600">Excused</div>
              <div className="text-xs text-gray-500">
                {((stats.excused / stats.total) * 100).toFixed(1)}%
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">
                {stats.total}
              </div>
              <div className="text-sm text-gray-600">Total</div>
              <div className="text-xs text-gray-500">Students</div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search students by name or roll number..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page when searching
                  }}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" onClick={markPagePresent} size="sm">
                  Mark Page Present
                </Button>
                <Button variant="outline" onClick={markPageAbsent} size="sm">
                  Mark Page Absent
                </Button>
                <Button variant="outline" onClick={markAllPresent} size="sm">
                  Mark All Present
                </Button>
                <Button variant="outline" onClick={markAllAbsent} size="sm">
                  Mark All Absent
                </Button>
              </div>
            </div>

            {/* Pagination Info */}
            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
              <span>
                Showing {startIndex + 1}-
                {Math.min(
                  startIndex + STUDENTS_PER_PAGE,
                  filteredStudents.length
                )}{" "}
                of {filteredStudents.length} students
              </span>
              <span>
                Page {currentPage} of {totalPages}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Student Grid */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Student Attendance</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  Grid View
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  List View
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === "grid" ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {paginatedStudents.map((student) => (
                  <div
                    key={student.id}
                    className="border rounded-lg p-3 space-y-3 bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-sm">{student.name}</h3>
                        <p className="text-xs text-gray-600">
                          {student.rollNo}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(student.attendanceStatus)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1 text-xs">
                      {[
                        {
                          value: "PRESENT",
                          label: "Present",
                          color: "text-green-600",
                        },
                        {
                          value: "ABSENT",
                          label: "Absent",
                          color: "text-red-600",
                        },
                        {
                          value: "LATE",
                          label: "Late",
                          color: "text-yellow-600",
                        },
                        {
                          value: "EXCUSED",
                          label: "Excused",
                          color: "text-blue-600",
                        },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            updateStudentStatus(
                              student.id,
                              option.value as Student["attendanceStatus"]
                            );
                          }}
                          className={`flex items-center gap-1 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                            student.attendanceStatus === option.value
                              ? "bg-gray-100"
                              : ""
                          }`}
                        >
                          <div
                            className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                              student.attendanceStatus === option.value
                                ? "border-current bg-current"
                                : "border-gray-300"
                            }`}
                          >
                            {student.attendanceStatus === option.value && (
                              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                            )}
                          </div>
                          <span className={`${option.color} font-medium`}>
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>

                    <Textarea
                      placeholder="Remarks..."
                      value={student.remarks}
                      onChange={(e) =>
                        updateStudentRemarks(student.id, e.target.value)
                      }
                      className="min-h-[60px] text-xs resize-none"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {paginatedStudents.map((student) => (
                  <div
                    key={student.id}
                    className="border rounded-lg p-3 bg-white"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{student.name}</h3>
                        <p className="text-sm text-gray-600">
                          {student.rollNo}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {getStatusIcon(student.attendanceStatus)}
                        <Badge
                          className={`${getStatusColor(
                            student.attendanceStatus
                          )} text-xs`}
                        >
                          {student.attendanceStatus}
                        </Badge>
                      </div>

                      <div className="flex gap-2">
                        {[
                          {
                            value: "PRESENT",
                            label: <CheckCircle className="h-4 w-4" />,
                            color: "text-green-600",
                            bg: "bg-green-100",
                            hoverBg: "hover:bg-green-200",
                          },
                          {
                            value: "ABSENT",
                            label: <XCircle className="h-4 w-4" />,
                            color: "text-red-600",
                            bg: "bg-red-100",
                            hoverBg: "hover:bg-red-200",
                          },
                          {
                            value: "LATE",
                            label: <AlertCircle className="h-4 w-4" />,
                            color: "text-yellow-600",
                            bg: "bg-yellow-100",
                            hoverBg: "hover:bg-yellow-200",
                          },
                          {
                            value: "EXCUSED",
                            label: <UserCheck className="h-4 w-4" />,
                            color: "text-blue-600",
                            bg: "bg-blue-100",
                            hoverBg: "hover:bg-blue-200",
                          },
                        ].map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              updateStudentStatus(
                                student.id,
                                option.value as Student["attendanceStatus"]
                              );
                            }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                              student.attendanceStatus === option.value
                                ? `${option.bg} ${option.color} border-current `
                                : `bg-gray-100 text-gray-400 border-gray-300 ${option.hoverBg} hover:text-gray-600 focus:ring-gray-400`
                            }`}
                            title={`Mark as ${option.value.toLowerCase()}`}
                            aria-label={`Mark ${
                              student.name
                            } as ${option.value.toLowerCase()}`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>

                      <Textarea
                        placeholder="Remarks..."
                        value={student.remarks}
                        onChange={(e) =>
                          updateStudentRemarks(student.id, e.target.value)
                        }
                        className="w-40 h-6 text-xs"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Actions */}
        <div className="flex gap-4 justify-end">
          <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting
              ? "Submitting..."
              : `Submit Attendance (${stats.total} students)`}
          </Button>
        </div>
      </div>
    </div>
  );
}

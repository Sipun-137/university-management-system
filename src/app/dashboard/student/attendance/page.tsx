"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle, XCircle, Clock, Download, FileText } from "lucide-react"

// Demo attendance data
const attendanceData = {
  "2025-05-27": [
    {
      subject: "Data Structures",
      subjectCode: "CS301",
      period: 1,
      status: "PRESENT",
      remarks: null,
    },
    {
      subject: "Computer Networks",
      subjectCode: "CS303",
      period: 3,
      status: "ABSENT",
      remarks: "Sick",
    },
  ],
  "2025-05-26": [
    {
      subject: "Operating Systems",
      subjectCode: "CS302",
      period: 2,
      status: "PRESENT",
      remarks: null,
    },
  ],
  "2025-05-25": [
    {
      subject: "Data Structures",
      subjectCode: "CS301",
      period: 1,
      status: "PRESENT",
      remarks: null,
    },
    {
      subject: "Database Systems",
      subjectCode: "CS304",
      period: 2,
      status: "PRESENT",
      remarks: null,
    },
  ],
  "2025-05-24": [
    {
      subject: "Software Engineering",
      subjectCode: "CS305",
      period: 1,
      status: "ABSENT",
      remarks: "Medical",
    },
  ],
  "2025-05-23": [
    {
      subject: "Machine Learning",
      subjectCode: "CS306",
      period: 3,
      status: "PRESENT",
      remarks: null,
    },
  ],
}

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // Calculate attendance statistics
  const totalClasses = Object.values(attendanceData).flat().length
  const presentClasses = Object.values(attendanceData)
    .flat()
    .filter((record) => record.status === "PRESENT").length
  const attendancePercentage = Math.round((presentClasses / totalClasses) * 100)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
            <p className="text-gray-600">Track your attendance records and statistics</p>
          </div>
        </div>

        {/* Attendance Statistics Cards - Following wireframe layout */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Percentage Card */}
          <Card className="text-center">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Percentage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">
                <span className={attendancePercentage >= 75 ? "text-green-600" : "text-red-600"}>
                  {attendancePercentage}%
                </span>
              </div>
              <Badge variant={attendancePercentage >= 75 ? "default" : "destructive"}>
                {attendancePercentage >= 75 ? "Good Standing" : "Below Requirement"}
              </Badge>
            </CardContent>
          </Card>

          {/* Attended Classes Card */}
          <Card className="text-center">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Attended Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2 text-blue-600">{presentClasses}</div>
              <p className="text-sm text-gray-600">out of {totalClasses} classes</p>
            </CardContent>
          </Card>

          {/* Action Buttons Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                View Summary
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Day-wise Attendance Records */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-1">
              <Calendar className="h-5 w-5" />
              Day-wise Attendance
            </CardTitle>
            <CardDescription>Click on a date to view detailed attendance for that day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(attendanceData)
                .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                .map(([date, records]) => (
                  <Card
                    key={date}
                    className={`cursor-pointer transition-all hover:shadow-md border-l-4 ${
                      records.every((r) => r.status === "PRESENT")
                        ? "border-l-green-500"
                        : records.some((r) => r.status === "PRESENT")
                          ? "border-l-yellow-500"
                          : "border-l-red-500"
                    } ${selectedDate === date ? "ring-2 ring-blue-500" : ""}`}
                    onClick={() => setSelectedDate(selectedDate === date ? null : date)}
                  >
                    <CardContent className="p-2 px-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{formatDate(date)}</h3>
                          <p className="text-sm text-gray-600">
                            {records.length} {records.length === 1 ? "class" : "classes"} •
                            {records.filter((r) => r.status === "PRESENT").length} present
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {Math.round((records.filter((r) => r.status === "PRESENT").length / records.length) * 100)}%
                          </Badge>
                          {records.every((r) => r.status === "PRESENT") ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : records.some((r) => r.status === "PRESENT") ? (
                            <Clock className="h-5 w-5 text-yellow-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      </div>

                      {selectedDate === date && (
                        <div className="mt-4 pt-4 border-t space-y-3">
                          {records.map((record, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm font-medium">Period {record.period}</span>
                                </div>
                                <div>
                                  <p className="font-medium">{record.subject}</p>
                                  <p className="text-sm text-gray-600">{record.subjectCode}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {record.status === "PRESENT" ? (
                                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Present
                                  </Badge>
                                ) : (
                                  <Badge variant="destructive">
                                    <XCircle className="h-3 w-3 mr-1" />
                                    Absent
                                  </Badge>
                                )}
                                {record.remarks && (
                                  <Badge variant="outline" className="text-xs">
                                    {record.remarks}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

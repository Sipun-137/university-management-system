"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { TodaySchedule } from "./today-schedule"
import { WeeklyTimetable } from "./weekly-timetable"
import { UpcomingClasses } from "./upcoming-classes"
import { getStudentTimeTable } from "@/services/TimeTableService/TimeTableService"

// Mock data based on the provided student timetable
const mockStudentTimetable = [
  {
    subject: {
      id: 23,
      name: "Programming in C",
      subjectCode: "CS103",
      weeklyHours: 4,
    },
    faculty: {
      id: 16,
      name: "Dr. Aditi Sharma",
      email: "aditi.sharma@university.edu",
    },
    timeSlot: {
      day: "FRIDAY",
      period: 1,
      startTime: "08:00",
      endTime: "09:00",
      shift: "MORNING",
    },
  },
  {
    subject: {
      id: 21,
      name: "Mathematics I",
      subjectCode: "CS101",
      weeklyHours: 4,
    },
    faculty: {
      id: 5,
      name: "shrinivas sahu",
      email: "shrinu@gmail.com",
    },
    timeSlot: {
      day: "FRIDAY",
      period: 2,
      startTime: "09:00",
      endTime: "10:00",
      shift: "MORNING",
    },
  },
  {
    subject: {
      id: 23,
      name: "Programming in C",
      subjectCode: "CS103",
      weeklyHours: 4,
    },
    faculty: {
      id: 16,
      name: "Dr. Aditi Sharma",
      email: "aditi.sharma@university.edu",
    },
    timeSlot: {
      day: "MONDAY",
      period: 1,
      startTime: "08:00",
      endTime: "09:00",
      shift: "MORNING",
    },
  },
  {
    subject: {
      id: 21,
      name: "Mathematics I",
      subjectCode: "CS101",
      weeklyHours: 4,
    },
    faculty: {
      id: 5,
      name: "shrinivas sahu",
      email: "shrinu@gmail.com",
    },
    timeSlot: {
      day: "MONDAY",
      period: 2,
      startTime: "09:00",
      endTime: "10:00",
      shift: "MORNING",
    },
  },
  {
    subject: {
      id: 22,
      name: "Engineering Physics",
      subjectCode: "CS102",
      weeklyHours: 3,
    },
    faculty: {
      id: 22,
      name: "Dr. Meena Nair",
      email: "meena.nair@university.edu",
    },
    timeSlot: {
      day: "MONDAY",
      period: 3,
      startTime: "10:00",
      endTime: "11:00",
      shift: "MORNING",
    },
  },
  {
    subject: {
      id: 24,
      name: "Basic Electrical Engineering",
      subjectCode: "CS104",
      weeklyHours: 3,
    },
    faculty: {
      id: 21,
      name: "Mr. Ankit Roy",
      email: "ankit.roy@university.edu",
    },
    timeSlot: {
      day: "MONDAY",
      period: 4,
      startTime: "13:00",
      endTime: "14:00",
      shift: "AFTERNOON",
    },
  },
  {
    subject: {
      id: 23,
      name: "Programming in C",
      subjectCode: "CS103",
      weeklyHours: 4,
    },
    faculty: {
      id: 16,
      name: "Dr. Aditi Sharma",
      email: "aditi.sharma@university.edu",
    },
    timeSlot: {
      day: "THURSDAY",
      period: 1,
      startTime: "08:00",
      endTime: "09:00",
      shift: "MORNING",
    },
  },
  {
    subject: {
      id: 21,
      name: "Mathematics I",
      subjectCode: "CS101",
      weeklyHours: 4,
    },
    faculty: {
      id: 5,
      name: "shrinivas sahu",
      email: "shrinu@gmail.com",
    },
    timeSlot: {
      day: "THURSDAY",
      period: 2,
      startTime: "09:00",
      endTime: "10:00",
      shift: "MORNING",
    },
  },
  {
    subject: {
      id: 22,
      name: "Engineering Physics",
      subjectCode: "CS102",
      weeklyHours: 3,
    },
    faculty: {
      id: 22,
      name: "Dr. Meena Nair",
      email: "meena.nair@university.edu",
    },
    timeSlot: {
      day: "THURSDAY",
      period: 3,
      startTime: "10:00",
      endTime: "11:00",
      shift: "MORNING",
    },
  },
  {
    subject: {
      id: 24,
      name: "Basic Electrical Engineering",
      subjectCode: "CS104",
      weeklyHours: 3,
    },
    faculty: {
      id: 21,
      name: "Mr. Ankit Roy",
      email: "ankit.roy@university.edu",
    },
    timeSlot: {
      day: "THURSDAY",
      period: 4,
      startTime: "13:00",
      endTime: "14:00",
      shift: "AFTERNOON",
    },
  },
  {
    subject: {
      id: 26,
      name: "Engineering Graphics",
      subjectCode: "CS106",
      weeklyHours: 2,
    },
    faculty: {
      id: 23,
      name: "Mr. Vikram Sinha",
      email: "vikram.sinha@university.edu",
    },
    timeSlot: {
      day: "THURSDAY",
      period: 5,
      startTime: "14:00",
      endTime: "15:00",
      shift: "AFTERNOON",
    },
  },
  {
    subject: {
      id: 25,
      name: "Communication Skills",
      subjectCode: "CS105",
      weeklyHours: 2,
    },
    faculty: {
      id: 20,
      name: "Ms. Swati Joshi",
      email: "swati.joshi@university.edu",
    },
    timeSlot: {
      day: "THURSDAY",
      period: 6,
      startTime: "15:00",
      endTime: "16:00",
      shift: "AFTERNOON",
    },
  },
  {
    subject: {
      id: 23,
      name: "Programming in C",
      subjectCode: "CS103",
      weeklyHours: 4,
    },
    faculty: {
      id: 16,
      name: "Dr. Aditi Sharma",
      email: "aditi.sharma@university.edu",
    },
    timeSlot: {
      day: "TUESDAY",
      period: 1,
      startTime: "08:00",
      endTime: "09:00",
      shift: "MORNING",
    },
  },
  {
    subject: {
      id: 21,
      name: "Mathematics I",
      subjectCode: "CS101",
      weeklyHours: 4,
    },
    faculty: {
      id: 5,
      name: "shrinivas sahu",
      email: "shrinu@gmail.com",
    },
    timeSlot: {
      day: "TUESDAY",
      period: 2,
      startTime: "09:00",
      endTime: "10:00",
      shift: "MORNING",
    },
  },
  {
    subject: {
      id: 22,
      name: "Engineering Physics",
      subjectCode: "CS102",
      weeklyHours: 3,
    },
    faculty: {
      id: 22,
      name: "Dr. Meena Nair",
      email: "meena.nair@university.edu",
    },
    timeSlot: {
      day: "TUESDAY",
      period: 3,
      startTime: "10:00",
      endTime: "11:00",
      shift: "MORNING",
    },
  },
  {
    subject: {
      id: 24,
      name: "Basic Electrical Engineering",
      subjectCode: "CS104",
      weeklyHours: 3,
    },
    faculty: {
      id: 21,
      name: "Mr. Ankit Roy",
      email: "ankit.roy@university.edu",
    },
    timeSlot: {
      day: "TUESDAY",
      period: 4,
      startTime: "13:00",
      endTime: "14:00",
      shift: "AFTERNOON",
    },
  },
  {
    subject: {
      id: 26,
      name: "Engineering Graphics",
      subjectCode: "CS106",
      weeklyHours: 2,
    },
    faculty: {
      id: 23,
      name: "Mr. Vikram Sinha",
      email: "vikram.sinha@university.edu",
    },
    timeSlot: {
      day: "TUESDAY",
      period: 5,
      startTime: "14:00",
      endTime: "15:00",
      shift: "AFTERNOON",
    },
  },
  {
    subject: {
      id: 25,
      name: "Communication Skills",
      subjectCode: "CS105",
      weeklyHours: 2,
    },
    faculty: {
      id: 20,
      name: "Ms. Swati Joshi",
      email: "swati.joshi@university.edu",
    },
    timeSlot: {
      day: "TUESDAY",
      period: 6,
      startTime: "15:00",
      endTime: "16:00",
      shift: "AFTERNOON",
    },
  },
]

export function StudentTimetable() {
  const [timetableData, setTimetableData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchTimetable = async () => {
      setIsLoading(true)
      // In real implementation, this would be:
      const response = await getStudentTimeTable();

      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setTimetableData(response)
      setIsLoading(false)
    }

    fetchTimetable()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TodaySchedule timetableData={timetableData} />
        <UpcomingClasses timetableData={timetableData} />
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Total Subjects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(timetableData.map((item) => item.subject.id)).size}</div>
            <p className="text-sm text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Timetable */}
      <Tabs defaultValue="weekly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          <TabsTrigger value="daily">Daily View</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly">
          <WeeklyTimetable timetableData={timetableData} />
        </TabsContent>

        <TabsContent value="daily">
          <DailyView timetableData={timetableData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DailyView({ timetableData }) {
  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" }).toUpperCase()
    return today
  })

  const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
  const dayClasses = timetableData.filter((item) => item.timeSlot.day === selectedDay)

  const navigateDay = (direction) => {
    const currentIndex = days.indexOf(selectedDay)
    if (direction === "prev" && currentIndex > 0) {
      setSelectedDay(days[currentIndex - 1])
    } else if (direction === "next" && currentIndex < days.length - 1) {
      setSelectedDay(days[currentIndex + 1])
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {selectedDay.charAt(0) + selectedDay.slice(1).toLowerCase()} Schedule
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateDay("prev")}
              disabled={days.indexOf(selectedDay) === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateDay("next")}
              disabled={days.indexOf(selectedDay) === days.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {dayClasses.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No classes scheduled for {selectedDay.toLowerCase()}
          </div>
        ) : (
          <div className="space-y-3">
            {dayClasses
              .sort((a, b) => a.timeSlot.period - b.timeSlot.period)
              .map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="text-center min-w-[60px]">
                    <div className="text-sm font-medium">Period {item.timeSlot.period}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.timeSlot.startTime} - {item.timeSlot.endTime}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{item.subject.name}</div>
                    <div className="text-sm text-muted-foreground">{item.subject.subjectCode}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{item.faculty.name}</div>
                    <Badge variant={item.timeSlot.shift === "MORNING" ? "default" : "secondary"}>
                      {item.timeSlot.shift}
                    </Badge>
                  </div>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

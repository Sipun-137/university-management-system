"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

export function UpcomingClasses({ timetableData }) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" }).toUpperCase()
  const currentTime = new Date()
  const currentHour = currentTime.getHours()
  const currentMinute = currentTime.getMinutes()
  const currentTimeString = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`

  // Get upcoming classes for today
  const todayUpcoming = timetableData
    .filter((item) => item.timeSlot.day === today && item.timeSlot.startTime > currentTimeString)
    .sort((a, b) => a.timeSlot.period - b.timeSlot.period)
    .slice(0, 3)

  // If no more classes today, get tomorrow's first few classes
  const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
  const todayIndex = days.indexOf(today)
  const tomorrowIndex = (todayIndex + 1) % 7
  const tomorrow = days[tomorrowIndex]

  const tomorrowClasses = timetableData
    .filter((item) => item.timeSlot.day === tomorrow)
    .sort((a, b) => a.timeSlot.period - b.timeSlot.period)
    .slice(0, 3 - todayUpcoming.length)

  const upcomingClasses = [...todayUpcoming, ...tomorrowClasses]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Upcoming Classes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingClasses.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">No upcoming classes</div>
        ) : (
          upcomingClasses.map((item, index) => (
            <div key={index} className="p-3 border rounded-lg">
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium text-sm">{item.subject.name}</div>
                <Badge variant="outline" className="text-xs">
                  {item.timeSlot.day === today ? "Today" : "Tomorrow"}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                {item.timeSlot.startTime} - {item.timeSlot.endTime}
              </div>
              <div className="text-xs text-muted-foreground">{item.faculty.name}</div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

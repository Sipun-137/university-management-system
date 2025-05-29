"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export function TodaySchedule({ timetableData }) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" }).toUpperCase()
  const todayClasses = timetableData
    .filter((item) => item.timeSlot.day === today)
    .sort((a, b) => a.timeSlot.period - b.timeSlot.period)

  const currentTime = new Date()
  const currentHour = currentTime.getHours()
  const currentMinute = currentTime.getMinutes()
  const currentTimeString = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`

  const getCurrentClass = () => {
    return todayClasses.find((item) => {
      const startTime = item.timeSlot.startTime
      const endTime = item.timeSlot.endTime
      return currentTimeString >= startTime && currentTimeString <= endTime
    })
  }

  const getNextClass = () => {
    return todayClasses.find((item) => {
      const startTime = item.timeSlot.startTime
      return currentTimeString < startTime
    })
  }

  const currentClass = getCurrentClass()
  const nextClass = getNextClass()

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Today's Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {todayClasses.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">No classes today</div>
        ) : (
          <>
            {currentClass && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-sm font-medium text-green-800">Current Class</div>
                <div className="font-medium">{currentClass.subject.name}</div>
                <div className="text-sm text-green-600">
                  {currentClass.timeSlot.startTime} - {currentClass.timeSlot.endTime}
                </div>
              </div>
            )}

            {nextClass && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm font-medium text-blue-800">Next Class</div>
                <div className="font-medium">{nextClass.subject.name}</div>
                <div className="text-sm text-blue-600">
                  {nextClass.timeSlot.startTime} - {nextClass.timeSlot.endTime}
                </div>
              </div>
            )}

            <div className="text-sm text-muted-foreground">{todayClasses.length} classes today</div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

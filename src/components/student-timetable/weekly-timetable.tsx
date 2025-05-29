"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function WeeklyTimetable({ timetableData }) {
  const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
  const periods = [1, 2, 3, 4, 5, 6]

  // Group data by day and period
  const groupedData = timetableData.reduce((acc, item) => {
    const key = `${item.timeSlot.day}-${item.timeSlot.period}`
    acc[key] = item
    return acc
  }, {})

  const getTimeForPeriod = (period) => {
    const timeSlots = {
      1: "08:00-09:00",
      2: "09:00-10:00",
      3: "10:00-11:00",
      4: "13:00-14:00",
      5: "14:00-15:00",
      6: "15:00-16:00",
    }
    return timeSlots[period] || ""
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Timetable</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              <div className="p-3 font-semibold text-center bg-gray-50 rounded">Time</div>
              {days.map((day) => (
                <div key={day} className="p-3 font-semibold text-center bg-gray-50 rounded">
                  {day.charAt(0) + day.slice(1).toLowerCase()}
                </div>
              ))}
            </div>

            {/* Timetable Grid */}
            {periods.map((period) => (
              <div key={period} className="grid grid-cols-7 gap-1 mb-1">
                <div className="p-3 text-center font-medium bg-gray-50 rounded flex flex-col">
                  <span className="text-sm font-bold">Period {period}</span>
                  <span className="text-xs text-muted-foreground">{getTimeForPeriod(period)}</span>
                </div>
                {days.map((day) => {
                  const key = `${day}-${period}`
                  const classItem = groupedData[key]

                  return (
                    <div key={day} className="p-2 min-h-[80px] border rounded">
                      {classItem ? (
                        <div className="h-full">
                          <div className="p-2 bg-blue-50 border border-blue-200 rounded h-full flex flex-col justify-between">
                            <div>
                              <div className="font-medium text-sm text-blue-900 leading-tight">
                                {classItem.subject.name}
                              </div>
                              <div className="text-xs text-blue-700 mt-1">{classItem.subject.subjectCode}</div>
                            </div>
                            <div className="mt-2">
                              <div className="text-xs text-blue-600 truncate">{classItem.faculty.name}</div>
                              <Badge
                                variant={classItem.timeSlot.shift === "MORNING" ? "default" : "secondary"}
                                className="text-xs mt-1"
                              >
                                {classItem.timeSlot.shift}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-400 text-xs">Free</div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

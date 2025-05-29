"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User } from "lucide-react"

export function TimetableView({ data, viewType, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (viewType === "grid") {
    return <GridView data={data} />
  }

  if (viewType === "list") {
    return <ListView data={data} />
  }

  if (viewType === "calendar") {
    return <CalendarView data={data} />
  }

  return null
}

function GridView({ data }) {
  // Group data by section
  const groupedData = data.reduce((acc, item) => {
    const key = `${item.sectionName} - ${item.branchName}`
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(item)
    return acc
  }, {})

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(groupedData).map(([sectionKey, items]) => (
        <Card key={sectionKey}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{sectionKey}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {items.slice(0, 5).map((item, index) => (
              <div key={index} className="p-2 border rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-sm">{item.subject.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {item.timeSlot.day.slice(0, 3)}
                  </Badge>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {item.faculty.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.timeSlot.startTime} - {item.timeSlot.endTime}
                  </div>
                </div>
              </div>
            ))}
            {items.length > 5 && (
              <div className="text-center text-sm text-gray-500">+{items.length - 5} more classes</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ListView({ data }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Section</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Faculty</TableHead>
            <TableHead>Day</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Shift</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No timetable data found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <div>
                    <div>{item.sectionName}</div>
                    <div className="text-sm text-gray-500">{item.branchName}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{item.subject.name}</div>
                    <div className="text-sm text-gray-500">{item.subject.subjectCode}</div>
                  </div>
                </TableCell>
                <TableCell>{item.faculty.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.timeSlot.day}</Badge>
                </TableCell>
                <TableCell>
                  {item.timeSlot.startTime} - {item.timeSlot.endTime}
                </TableCell>
                <TableCell className="text-center">{item.timeSlot.period}</TableCell>
                <TableCell>
                  <Badge variant={item.timeSlot.shift === "MORNING" ? "default" : "secondary"}>
                    {item.timeSlot.shift}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

function CalendarView({ data }) {
  const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
  const periods = [1, 2, 3, 4, 5, 6]

  // Group data by day and period
  const groupedData = data.reduce((acc, item) => {
    const key = `${item.timeSlot.day}-${item.timeSlot.period}`
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(item)
    return acc
  }, {})

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-7 gap-1 mb-2">
          <div className="p-2 font-semibold text-center">Period</div>
          {days.map((day) => (
            <div key={day} className="p-2 font-semibold text-center bg-gray-50 rounded">
              {day}
            </div>
          ))}
        </div>

        {periods.map((period) => (
          <div key={period} className="grid grid-cols-7 gap-1 mb-1">
            <div className="p-2 text-center font-medium bg-gray-50 rounded">{period}</div>
            {days.map((day) => {
              const key = `${day}-${period}`
              const classes = groupedData[key] || []

              return (
                <div key={day} className="p-1 min-h-[80px] border rounded">
                  {classes.map((item, index) => (
                    <div key={index} className="mb-1 p-1 bg-blue-50 rounded text-xs">
                      <div className="font-medium truncate">{item.subject.subjectCode}</div>
                      <div className="text-gray-600 truncate">{item.sectionName}</div>
                      <div className="text-gray-500 truncate">{item.faculty.name}</div>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

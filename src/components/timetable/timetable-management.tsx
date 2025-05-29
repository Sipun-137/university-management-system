"use client"

import { useState, useCallback, SetStateAction, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Download } from "lucide-react"
import { TimetableFilters } from "./timetable-filters"
import { TimetableView } from "./timetable-view"
import { CreateTimetableDialog } from "./create-timetable-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import axios from "axios"
import { GetAllTimeTable } from "@/services/TimeTableService/TimeTableService"

// Mock data based on your API response
// const mockTimetableData = [
//   {
//     sectionName: "CS-A",
//     branchName: "Computer Science",
//     subject: {
//       id: 21,
//       name: "Mathematics I",
//       subjectCode: "CS101",
//       weeklyHours: 4,
//     },
//     faculty: {
//       id: 5,
//       name: "shrinivas sahu",
//       email: "shrinu@gmail.com",
//     },
//     timeSlot: {
//       day: "MONDAY",
//       period: 1,
//       startTime: "08:00",
//       endTime: "09:00",
//       shift: "MORNING",
//     },
//     academicYear: "2024-2025",
//   },
//   {
//     sectionName: "CS-A",
//     branchName: "Computer Science",
//     subject: {
//       id: 25,
//       name: "Communication Skills",
//       subjectCode: "CS105",
//       weeklyHours: 2,
//     },
//     faculty: {
//       id: 20,
//       name: "Ms. Swati Joshi",
//       email: "swati.joshi@university.edu",
//     },
//     timeSlot: {
//       day: "MONDAY",
//       period: 2,
//       startTime: "09:00",
//       endTime: "10:00",
//       shift: "MORNING",
//     },
//     academicYear: "2024-2025",
//   },
//   {
//     sectionName: "CS-B",
//     branchName: "Computer Science",
//     subject: {
//       id: 22,
//       name: "Engineering Physics",
//       subjectCode: "CS102",
//       weeklyHours: 3,
//     },
//     faculty: {
//       id: 22,
//       name: "Dr. Meena Nair",
//       email: "meena.nair@university.edu",
//     },
//     timeSlot: {
//       day: "FRIDAY",
//       period: 1,
//       startTime: "08:00",
//       endTime: "09:00",
//       shift: "MORNING",
//     },
//     academicYear: "2024-2025",
//   },
//   // Add more mock data as needed
// ]

export function TimetableManagement() {
  const [timetableData, setTimetableData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeView, setActiveView] = useState("grid")

  // Filter timetable data
  const handleFilter = useCallback((filtered: SetStateAction<{ sectionName: string; branchName: string; subject: { id: number; name: string; subjectCode: string; weeklyHours: number }; faculty: { id: number; name: string; email: string }; timeSlot: { day: string; period: number; startTime: string; endTime: string; shift: string }; academicYear: string }[]>) => {
    setFilteredData(filtered)
  }, [])

  // Fetch all timetables
  const fetchAllTimetables = async () => {
    setIsLoading(true)
    try {
      // Replace with actual API call
      LoadTimeTable();

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error fetching timetables:", error)
      setIsLoading(false)
    }
  }

  // Fetch timetable by branch and year
  const fetchTimetableByBranchAndYear = async (branchId:number, year:string) => {
    setIsLoading(true)
    try {
      // Replace with actual API call
      LoadTimeTableByBranchAndYear(branchId,year);

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error fetching timetable:", error)
      setIsLoading(false)
    }
  }

  // Export timetable
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Section,Branch,Subject,Faculty,Day,Period,Start Time,End Time,Academic Year\n" 
      // +
      // filteredData
      //   .map(
      //     (item) =>
      //       `${item.sectionName},${item.branchName},${item.subject.name},${item.faculty.name},${item.timeSlot.day},${item.timeSlot.period},${item.timeSlot.startTime},${item.timeSlot.endTime},${item.academicYear}`,
      //   )
      //   .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "timetable.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }


  async function LoadTimeTableByBranchAndYear(branchId:number, year:string){
     const response = await axios.get(`http://localhost:8085/api/timetable/admin/branch/${branchId}/year/${year}`)
      const data =response.data;
      setTimetableData(data)
      setFilteredData(data)
  }


  async function LoadTimeTable(){
     const data= await GetAllTimeTable();
      setTimetableData(data)
      setFilteredData(data)
  }
  useEffect(()=>{
    LoadTimeTable()
  },[])
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Timetable Management</CardTitle>
            <CardDescription>View and manage university timetables</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Timetable
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <TimetableFilters
            timetableData={timetableData}
            onFilter={handleFilter}
            onFetchAll={fetchAllTimetables}
            onFetchByBranchAndYear={fetchTimetableByBranchAndYear}
            isLoading={isLoading}
          />

          <Tabs value={activeView} onValueChange={setActiveView} className="mt-6">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>

            <TabsContent value="grid" className="mt-4">
              <TimetableView data={filteredData} viewType="grid" isLoading={isLoading} />
            </TabsContent>

            <TabsContent value="list" className="mt-4">
              <TimetableView data={filteredData} viewType="list" isLoading={isLoading} />
            </TabsContent>

            <TabsContent value="calendar" className="mt-4">
              <TimetableView data={filteredData} viewType="calendar" isLoading={isLoading} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <CreateTimetableDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
    </div>
  )
}

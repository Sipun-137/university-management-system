"use client"

import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CourseManagement } from "@/components/academic/course-management"
import { BatchManagement } from "@/components/academic/batch-management"
import { BranchManagement } from "@/components/academic/branch-management"
import { SectionManagement } from "@/components/academic/section-management"
import { SemesterManagement } from "@/components/academic/semester-management"
import { SubjectManagement } from "@/components/academic/subject-management"

export function AcademicManagement() {
  const [activeTab, setActiveTab] = useState("courses")

  // This function will be passed to child components to refresh data when needed
  const refreshData = () => {
    // In a real application, this would trigger API calls to refresh data
    
    

    console.log(`Refreshing ${activeTab} data`)


  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Academic Management</h1>
        <p className="text-muted-foreground">
          Manage courses, batches, branches, sections, semesters, and subjects for the university.
        </p>
      </div>

      <Tabs defaultValue="courses" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="batches">Batches</TabsTrigger>
          <TabsTrigger value="branches">Branches</TabsTrigger>
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="semesters">Semesters</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="mt-6">
          <CourseManagement onRefresh={refreshData} />
        </TabsContent>

        <TabsContent value="batches" className="mt-6">
          <BatchManagement onRefresh={refreshData} />
        </TabsContent>

        <TabsContent value="branches" className="mt-6">
          <BranchManagement onRefresh={refreshData} />
        </TabsContent>

        <TabsContent value="sections" className="mt-6">
          <SectionManagement onRefresh={refreshData} />
        </TabsContent>

        <TabsContent value="semesters" className="mt-6">
          <SemesterManagement onRefresh={refreshData} />
        </TabsContent>

        <TabsContent value="subjects" className="mt-6">
          <SubjectManagement onRefresh={refreshData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

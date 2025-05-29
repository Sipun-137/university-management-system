/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AddSectionDialog } from "@/components/academic/dialogs/add-section-dialog"
import { EditSectionDialog } from "@/components/academic/dialogs/edit-section-dialog"
import { DeleteConfirmationDialog } from "@/components/academic/dialogs/delete-confirmation-dialog"
import { Badge } from "@/components/ui/badge"
import { getAllBatches } from "@/services/AcademicService/BatchService"
import { GetAllBranch } from "@/services/AcademicService/BranchService"
import { AddSection, deleteSection, getAllSections, updateSection } from "@/services/AcademicService/SectionService"


interface SectionManagementProps {
  onRefresh: () => void
}

export function SectionManagement({ onRefresh }: SectionManagementProps) {
  const [sections, setSections] = useState([])
  const [branches,setBranches]=useState([]);
  const [batches,setBatches]=useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedSection, setSelectedSection] = useState<any | null>(null)

  const handleAddSection = async (section: any) => {
    // In a real application, this would be an API call
    const newSection =await AddSection(section);
    console.log(newSection);
    loadSections();
    setIsAddDialogOpen(false)
    onRefresh()
  }

  const handleEditSection = async (section: any) => {
    // In a real application, this would be an API call
    const updatedSection = await updateSection(section.id,section);
    console.log(updatedSection);
    loadSections();

    setIsEditDialogOpen(false)
    onRefresh()
  }

  const handleDeleteSection = async () => {
    // In a real application, this would be an API call
    if (selectedSection) {
      const deletedSection = await deleteSection(selectedSection.id);
      console.log(deletedSection);
      loadSections();
      setIsDeleteDialogOpen(false)
      setSelectedSection(null)
      onRefresh()
    }
  }

  async function loadBatches(){
    const batchData=await getAllBatches()
    setBatches(batchData);
  }

  async function loadBranches(){
    const branchData=await GetAllBranch();
    setBranches(branchData);
  }


  async function loadSections(){
    const sectionData=await getAllSections();
    setSections(sectionData);
  }

  useEffect(() => {
    loadSections();
    loadBatches();
    loadBranches();
    
  }, [])
  

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Sections</CardTitle>
            <CardDescription>Manage class sections for different batches and branches.</CardDescription>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Section
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Strength</TableHead>
                {/* <TableHead>Subjects</TableHead> */}
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sections.length > 0 ? (
                sections.map((section:any) => (
                  <TableRow key={section.id}>
                    <TableCell className="font-medium">{section.name}</TableCell>
                    <TableCell>{section.batch.courseName} {section.batch.startYear}-{section.batch.endYear}</TableCell>
                    <TableCell>{section.branch.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm">
                            {section.currentStrength}/{section.maxStrength}
                          </span>
                          <Badge variant={section.currentStrength >= section.maxStrength ? "destructive" : "outline"}>
                            {section.currentStrength >= section.maxStrength ? "Full" : "Available"}
                          </Badge>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${(section.currentStrength / section.maxStrength) * 100}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    {/* <TableCell>{section.subjectCount}</TableCell> */}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedSection(section)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => {
                              setSelectedSection(section)
                              setIsDeleteDialogOpen(true)
                            }}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No sections found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddSectionDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddSection}
        batches={batches}
          branches={branches}
      />

      {selectedSection && (
        <EditSectionDialog
          open={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false)
            setSelectedSection(null)
          }}
          onSave={handleEditSection}
          section={selectedSection}
          batches={batches}
          branches={branches}
        />
      )}

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false)
          setSelectedSection(null)
        }}
        onDelete={handleDeleteSection}
        title="Delete Section"
        description={`Are you sure you want to delete Section ${selectedSection?.name} of ${selectedSection?.branch} (${selectedSection?.batch})? This action cannot be undone.`}
      />
    </>
  )
}

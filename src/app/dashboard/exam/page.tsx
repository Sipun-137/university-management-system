/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  Clock,
  BookOpen,
  Search,
  Filter,
  FileText,
  Eye,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import toast from "react-hot-toast"

interface Exam {
  id: number
  subject: {
    id: number
    name: string
    subjectCode: string
    weeklyHours: number
  }
  semester: {
    id: number
    number: number
    current: boolean
    branch: {
      id: number
      name: string
      course: {
        id: number
        name: string
      }
    }
  }
  batch: {
    id: number
    startYear: number
    endYear: number
  }
  branch: {
    id: number
    name: string
    course: {
      id: number
      name: string
    }
  }
  examType: string
  examDate: string
  totalMarks: number
  durationMinutes: number
  isPublished: boolean
  version: number
  rubrics: any
}

interface ExamFormData {
  subjectId: string
  semesterId: string
  batchId: string
  branchId: string
  examType: string
  examDate: string
  totalMarks: string
  durationMinutes: string
}

export default function ExamManagement() {
  const [exams, setExams] = useState<Exam[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingExam, setEditingExam] = useState<Exam | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterBranch, setFilterBranch] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState<ExamFormData>({
    subjectId: "",
    semesterId: "",
    batchId: "",
    branchId: "",
    examType: "",
    examDate: "",
    totalMarks: "",
    durationMinutes: "",
  })

  // Mock data with loading simulation
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockExams: Exam[] = [
        {
          id: 1,
          subject: {
            id: 21,
            name: "Mathematics I",
            subjectCode: "CS101",
            weeklyHours: 4,
          },
          semester: {
            id: 1,
            number: 1,
            current: true,
            branch: {
              id: 2,
              name: "Computer Science",
              course: {
                id: 1,
                name: "B.Tech",
              },
            },
          },
          batch: {
            id: 4,
            startYear: 2024,
            endYear: 2028,
          },
          branch: {
            id: 2,
            name: "Computer Science",
            course: {
              id: 1,
              name: "B.Tech",
            },
          },
          examType: "MID_SEM",
          examDate: "2025-06-15",
          totalMarks: 30.0,
          durationMinutes: 90,
          isPublished: false,
          version: 0,
          rubrics: null,
        },
        {
          id: 2,
          subject: {
            id: 22,
            name: "Engineering Physics",
            subjectCode: "CS102",
            weeklyHours: 3,
          },
          semester: {
            id: 1,
            number: 1,
            current: true,
            branch: {
              id: 2,
              name: "Computer Science",
              course: {
                id: 1,
                name: "B.Tech",
              },
            },
          },
          batch: {
            id: 4,
            startYear: 2024,
            endYear: 2028,
          },
          branch: {
            id: 2,
            name: "Computer Science",
            course: {
              id: 1,
              name: "B.Tech",
            },
          },
          examType: "FINAL",
          examDate: "2025-07-20",
          totalMarks: 100.0,
          durationMinutes: 180,
          isPublished: true,
          version: 0,
          rubrics: null,
        },
        {
          id: 3,
          subject: {
            id: 23,
            name: "Data Structures",
            subjectCode: "CS201",
            weeklyHours: 4,
          },
          semester: {
            id: 2,
            number: 2,
            current: false,
            branch: {
              id: 2,
              name: "Computer Science",
              course: {
                id: 1,
                name: "B.Tech",
              },
            },
          },
          batch: {
            id: 4,
            startYear: 2024,
            endYear: 2028,
          },
          branch: {
            id: 2,
            name: "Computer Science",
            course: {
              id: 1,
              name: "B.Tech",
            },
          },
          examType: "MID_SEM",
          examDate: "2025-08-10",
          totalMarks: 50.0,
          durationMinutes: 120,
          isPublished: false,
          version: 0,
          rubrics: null,
        },
      ]
      setExams(mockExams)
      setIsLoading(false)
    }

    loadData()
  }, [])

  // Filtered exams based on search and filters
  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const matchesSearch =
        exam.subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.subject.subjectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.branch.name.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = filterType === "all" || exam.examType === filterType
      const matchesBranch = filterBranch === "all" || exam.branch.name === filterBranch
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "published" && exam.isPublished) ||
        (filterStatus === "draft" && !exam.isPublished)

      return matchesSearch && matchesType && matchesBranch && matchesStatus
    })
  }, [exams, searchTerm, filterType, filterBranch, filterStatus])

  // Get unique branches for filter
  const uniqueBranches = useMemo(() => {
    const branches = exams.map((exam) => exam.branch.name)
    return [...new Set(branches)]
  }, [exams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const examData = {
      subjectId: Number.parseInt(formData.subjectId),
      semesterId: Number.parseInt(formData.semesterId),
      batchId: Number.parseInt(formData.batchId),
      branchId: Number.parseInt(formData.branchId),
      examType: formData.examType,
      examDate: formData.examDate,
      totalMarks: Number.parseFloat(formData.totalMarks),
      durationMinutes: Number.parseInt(formData.durationMinutes),
    }

    try {
      if (editingExam) {
        toast.success("Exam updated successfully")
        
      } else {
        toast.success("Exam created successfully")
      }

      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      toast.error("Failed to save exam")
      
    }
  }

  const handleEdit = (exam: Exam) => {
    setEditingExam(exam)
    setFormData({
      subjectId: exam.subject.id.toString(),
      semesterId: exam.semester.id.toString(),
      batchId: exam.batch.id.toString(),
      branchId: exam.branch.id.toString(),
      examType: exam.examType,
      examDate: exam.examDate,
      totalMarks: exam.totalMarks.toString(),
      durationMinutes: exam.durationMinutes.toString(),
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (examId: number) => {
    try {
      setExams(exams.filter((exam) => exam.id !== examId))
      toast.success("Exam deleted successfully")
      
    } catch (error) {
      toast.error("Failed to delete exam")
    }
  }

  const resetForm = () => {
    setFormData({
      subjectId: "",
      semesterId: "",
      batchId: "",
      branchId: "",
      examType: "",
      examDate: "",
      totalMarks: "",
      durationMinutes: "",
    })
    setEditingExam(null)
  }

  const getExamTypeBadgeColor = (type: string) => {
    switch (type) {
      case "MID_SEM":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "FINAL":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "QUIZ":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setFilterType("all")
    setFilterBranch("all")
    setFilterStatus("all")
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              Exam Management
            </CardTitle>
            <CardDescription className="text-base">
              Create, update, and manage exams for different subjects and semesters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Enhanced Search and Filters */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search exams by subject, code, or branch..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-40 h-11">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Exam Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="MID_SEM">Mid Semester</SelectItem>
                      <SelectItem value="FINAL">Final</SelectItem>
                      <SelectItem value="QUIZ">Quiz</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterBranch} onValueChange={setFilterBranch}>
                    <SelectTrigger className="w-40 h-11">
                      <SelectValue placeholder="Branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Branches</SelectItem>
                      {uniqueBranches.map((branch) => (
                        <SelectItem key={branch} value={branch}>
                          {branch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32 h-11">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Filter Summary and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium">{filteredExams.length}</span> of{" "}
                    <span className="font-medium">{exams.length}</span> exams
                  </p>
                  {(searchTerm || filterType !== "all" || filterBranch !== "all" || filterStatus !== "all") && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 lg:px-3">
                      Clear filters
                    </Button>
                  )}
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={resetForm} className="h-11">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Exam
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>{editingExam ? "Edit Exam" : "Create New Exam"}</DialogTitle>
                      <DialogDescription>
                        {editingExam ? "Update exam details" : "Fill in the exam information"}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="subjectId">Subject ID</Label>
                          <Input
                            id="subjectId"
                            type="number"
                            value={formData.subjectId}
                            onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="semesterId">Semester ID</Label>
                          <Input
                            id="semesterId"
                            type="number"
                            value={formData.semesterId}
                            onChange={(e) => setFormData({ ...formData, semesterId: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="batchId">Batch ID</Label>
                          <Input
                            id="batchId"
                            type="number"
                            value={formData.batchId}
                            onChange={(e) => setFormData({ ...formData, batchId: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="branchId">Branch ID</Label>
                          <Input
                            id="branchId"
                            type="number"
                            value={formData.branchId}
                            onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="examType">Exam Type</Label>
                        <Select
                          value={formData.examType}
                          onValueChange={(value) => setFormData({ ...formData, examType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select exam type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MID_SEM">Mid Semester</SelectItem>
                            <SelectItem value="FINAL">Final</SelectItem>
                            <SelectItem value="QUIZ">Quiz</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="examDate">Exam Date</Label>
                        <Input
                          id="examDate"
                          type="date"
                          value={formData.examDate}
                          onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="totalMarks">Total Marks</Label>
                          <Input
                            id="totalMarks"
                            type="number"
                            step="0.1"
                            value={formData.totalMarks}
                            onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="durationMinutes">Duration (minutes)</Label>
                          <Input
                            id="durationMinutes"
                            type="number"
                            value={formData.durationMinutes}
                            onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">{editingExam ? "Update" : "Create"} Exam</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Enhanced Table or Empty State */}
            {filteredExams.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No exams found</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    {searchTerm || filterType !== "all" || filterBranch !== "all" || filterStatus !== "all"
                      ? "Try adjusting your search or filters to find what you're looking for."
                      : "Get started by creating your first exam."}
                  </p>
                  {searchTerm || filterType !== "all" || filterBranch !== "all" || filterStatus !== "all" ? (
                    <Button variant="outline" onClick={clearFilters}>
                      Clear filters
                    </Button>
                  ) : (
                    <Button onClick={() => setIsDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Exam
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Subject</TableHead>
                      <TableHead className="font-semibold">Branch</TableHead>
                      <TableHead className="font-semibold">Batch</TableHead>
                      <TableHead className="font-semibold">Type</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                      <TableHead className="font-semibold">Marks</TableHead>
                      <TableHead className="font-semibold">Duration</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExams.map((exam) => (
                      <TableRow key={exam.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                              <BookOpen className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium">{exam.subject.name}</div>
                              <div className="text-sm text-muted-foreground">{exam.subject.subjectCode}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{exam.branch.name}</div>
                            <div className="text-sm text-muted-foreground">{exam.branch.course.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            {exam.batch.startYear} - {exam.batch.endYear}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getExamTypeBadgeColor(exam.examType)}>
                            {exam.examType.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="font-mono text-sm">{new Date(exam.examDate).toLocaleDateString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">{exam.totalMarks}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="font-mono text-sm">{exam.durationMinutes}m</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={exam.isPublished ? "default" : "secondary"}>
                            {exam.isPublished ? "Published" : "Draft"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => handleEdit(exam)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit exam</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>View details</TooltipContent>
                            </Tooltip>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(exam)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete
                                    </DropdownMenuItem>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the exam &quot;
                                        {exam.subject.name}&quot; and remove all associated data.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDelete(exam.id)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}

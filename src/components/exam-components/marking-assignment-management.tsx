/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Plus,
  BookOpen,
  Search,
  Filter,
  ClipboardList,
  Calendar,
  Clock,
  Eye,
  MoreHorizontal,
  UserCheck,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import toast from "react-hot-toast";

interface MarkingAssignment {
  id: number;
  exam: {
    id: number;
    subject: {
      id: number;
      name: string;
      subjectCode: string;
      weeklyHours: number;
    };
    semester: {
      id: number;
      number: number;
      current: boolean;
      branch: {
        id: number;
        name: string;
        course: {
          id: number;
          name: string;
        };
      };
    };
    batch: {
      id: number;
      startYear: number;
      endYear: number;
    };
    branch: {
      id: number;
      name: string;
      course: {
        id: number;
        name: string;
      };
    };
    examType: string;
    examDate: string;
  };
  marker: {
    id: number;
    fullName: string;
    moderator: boolean;
  };
  progress: string;
  assignedDate: string;
  dueDate: string;
}

interface AssignmentFormData {
  examId: string;
  markerId: string;
  progress: string;
}

// Mock data for dropdowns
const mockExams = [
  { id: 1, name: "Mathematics I - MID_SEM", subjectCode: "CS101" },
  { id: 2, name: "Engineering Physics - MID_SEM", subjectCode: "CS102" },
  { id: 3, name: "Data Structures - FINAL", subjectCode: "CS201" },
];

const mockMarkers = [
  { id: 1, name: "Dr. Aditi Sharma", isModerator: false },
  { id: 2, name: "Prof. Rajesh Kumar", isModerator: true },
  { id: 3, name: "Dr. Priya Patel", isModerator: false },
];

export default function MarkingAssignmentManagement() {
  const [assignments, setAssignments] = useState<MarkingAssignment[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProgress, setFilterProgress] = useState("all");
  const [filterExamType, setFilterExamType] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<AssignmentFormData>({
    examId: "",
    markerId: "",
    progress: "NOT_STARTED",
  });

  // Mock data with loading simulation
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 900));

      const mockAssignments: MarkingAssignment[] = [
        {
          id: 1,
          exam: {
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
            examType: "MID_SEM",
            examDate: "2025-06-15",
          },
          marker: {
            id: 1,
            fullName: "Dr. Aditi Sharma",
            moderator: false,
          },
          progress: "IN_PROGRESS",
          assignedDate: "2025-06-10",
          dueDate: "2025-06-20",
        },
        {
          id: 2,
          exam: {
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
            examType: "FINAL",
            examDate: "2025-07-20",
          },
          marker: {
            id: 2,
            fullName: "Prof. Rajesh Kumar",
            moderator: true,
          },
          progress: "COMPLETED",
          assignedDate: "2025-07-15",
          dueDate: "2025-07-25",
        },
        {
          id: 3,
          exam: {
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
          },
          marker: {
            id: 3,
            fullName: "Dr. Priya Patel",
            moderator: false,
          },
          progress: "NOT_STARTED",
          assignedDate: "2025-08-05",
          dueDate: "2025-08-15",
        },
      ];
      setAssignments(mockAssignments);
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Filtered assignments based on search and filters
  const filteredAssignments = useMemo(() => {
    return assignments.filter((assignment) => {
      const matchesSearch =
        assignment.exam.subject.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        assignment.exam.subject.subjectCode
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        assignment.marker.fullName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        assignment.exam.branch.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesProgress =
        filterProgress === "all" || assignment.progress === filterProgress;
      const matchesExamType =
        filterExamType === "all" || assignment.exam.examType === filterExamType;

      return matchesSearch && matchesProgress && matchesExamType;
    });
  }, [assignments, searchTerm, filterProgress, filterExamType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      toast.success("Marking assignment created successfully");

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Failed to create marking assignment");
    }
  };

  const updateProgress = async (assignmentId: number, newProgress: string) => {
    try {
      const updatedAssignments = assignments.map((assignment) =>
        assignment.id === assignmentId
          ? { ...assignment, progress: newProgress }
          : assignment
      );
      setAssignments(updatedAssignments);
      toast.success("Progress updated successfully");
    } catch (error) {
      toast.error("Failed to update progress");
    }
  };

  const resetForm = () => {
    setFormData({
      examId: "",
      markerId: "",
      progress: "NOT_STARTED",
    });
  };

  const getProgressColor = (progress: string) => {
    switch (progress) {
      case "NOT_STARTED":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "COMPLETED":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "REVIEWED":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getProgressValue = (progress: string) => {
    switch (progress) {
      case "NOT_STARTED":
        return 0;
      case "IN_PROGRESS":
        return 50;
      case "COMPLETED":
        return 80;
      case "REVIEWED":
        return 100;
      default:
        return 0;
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterProgress("all");
    setFilterExamType("all");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-6 w-40" />
            </div>
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-40" />
            </div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <ClipboardList className="h-5 w-5 text-purple-600" />
              </div>
              Marking Assignment Management
            </CardTitle>
            <CardDescription className="text-base">
              Assign exam evaluation duties to markers and track progress
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
                      placeholder="Search assignments by subject, marker, or branch..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select
                    value={filterProgress}
                    onValueChange={setFilterProgress}
                  >
                    <SelectTrigger className="w-40 h-11">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Progress" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Progress</SelectItem>
                      <SelectItem value="NOT_STARTED">Not Started</SelectItem>
                      <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                      <SelectItem value="REVIEWED">Reviewed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={filterExamType}
                    onValueChange={setFilterExamType}
                  >
                    <SelectTrigger className="w-32 h-11">
                      <SelectValue placeholder="Exam Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="MID_SEM">Mid Sem</SelectItem>
                      <SelectItem value="FINAL">Final</SelectItem>
                      <SelectItem value="QUIZ">Quiz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Filter Summary and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <p className="text-sm text-muted-foreground">
                    Showing{" "}
                    <span className="font-medium">
                      {filteredAssignments.length}
                    </span>{" "}
                    of <span className="font-medium">{assignments.length}</span>{" "}
                    assignments
                  </p>
                  {(searchTerm ||
                    filterProgress !== "all" ||
                    filterExamType !== "all") && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="h-8 px-2 lg:px-3"
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={resetForm} className="h-11">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Assignment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create Marking Assignment</DialogTitle>
                      <DialogDescription>
                        Assign exam evaluation duty to a marker
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="examId">Exam</Label>
                        <Select
                          value={formData.examId}
                          onValueChange={(value) =>
                            setFormData({ ...formData, examId: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select exam" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockExams.map((exam) => (
                              <SelectItem
                                key={exam.id}
                                value={exam.id.toString()}
                              >
                                {exam.name} ({exam.subjectCode})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="markerId">Marker</Label>
                        <Select
                          value={formData.markerId}
                          onValueChange={(value) =>
                            setFormData({ ...formData, markerId: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select marker" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockMarkers.map((marker) => (
                              <SelectItem
                                key={marker.id}
                                value={marker.id.toString()}
                              >
                                {marker.name}{" "}
                                {marker.isModerator && "(Moderator)"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="progress">Initial Progress</Label>
                        <Select
                          value={formData.progress}
                          onValueChange={(value) =>
                            setFormData({ ...formData, progress: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select progress status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="NOT_STARTED">
                              Not Started
                            </SelectItem>
                            <SelectItem value="IN_PROGRESS">
                              In Progress
                            </SelectItem>
                            <SelectItem value="COMPLETED">Completed</SelectItem>
                            <SelectItem value="REVIEWED">Reviewed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Create Assignment</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Enhanced Table or Empty State */}
            {filteredAssignments.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No assignments found
                  </h3>
                  <p className="text-muted-foreground text-center mb-4">
                    {searchTerm ||
                    filterProgress !== "all" ||
                    filterExamType !== "all"
                      ? "Try adjusting your search or filters to find what you're looking for."
                      : "Get started by creating your first marking assignment."}
                  </p>
                  {searchTerm ||
                  filterProgress !== "all" ||
                  filterExamType !== "all" ? (
                    <Button variant="outline" onClick={clearFilters}>
                      Clear filters
                    </Button>
                  ) : (
                    <Button onClick={() => setIsDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Assignment
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">
                        Exam Details
                      </TableHead>
                      <TableHead className="font-semibold">Marker</TableHead>
                      <TableHead className="font-semibold">
                        Branch & Batch
                      </TableHead>
                      <TableHead className="font-semibold">Timeline</TableHead>
                      <TableHead className="font-semibold">Progress</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssignments.map((assignment) => {
                      const daysUntilDue = getDaysUntilDue(assignment.dueDate);
                      const isOverdue = daysUntilDue < 0;
                      const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0;

                      return (
                        <TableRow
                          key={assignment.id}
                          className="hover:bg-muted/50 transition-colors"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center">
                                <BookOpen className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-medium text-base">
                                  {assignment.exam.subject.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {assignment.exam.subject.subjectCode}
                                </div>
                                <Badge className="mt-1" variant="outline">
                                  {assignment.exam.examType.replace("_", " ")}
                                </Badge>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-gradient-to-br from-green-400 to-blue-600 text-white font-semibold text-sm">
                                  {getInitials(assignment.marker.fullName)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {assignment.marker.fullName}
                                </div>
                                {assignment.marker.moderator && (
                                  <div className="flex items-center gap-1 mt-1">
                                    <UserCheck className="h-3 w-3 text-green-600" />
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      Moderator
                                    </Badge>
                                  </div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {assignment.exam.branch.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {assignment.exam.batch.startYear} -{" "}
                                {assignment.exam.batch.endYear}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Semester {assignment.exam.semester.number}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <div className="flex items-center gap-1 text-sm">
                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                <span className="font-mono">
                                  Due:{" "}
                                  {new Date(
                                    assignment.dueDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span
                                  className={`font-medium ${
                                    isOverdue
                                      ? "text-red-600"
                                      : isDueSoon
                                      ? "text-orange-600"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {isOverdue
                                    ? `${Math.abs(daysUntilDue)} days overdue`
                                    : daysUntilDue === 0
                                    ? "Due today"
                                    : `${daysUntilDue} days left`}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Badge
                                  className={getProgressColor(
                                    assignment.progress
                                  )}
                                >
                                  {assignment.progress.replace("_", " ")}
                                </Badge>
                              </div>
                              <div className="space-y-1">
                                <Progress
                                  value={getProgressValue(assignment.progress)}
                                  className="w-24 h-2"
                                />
                                <div className="text-xs text-muted-foreground">
                                  {getProgressValue(assignment.progress)}%
                                  complete
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Select
                                value={assignment.progress}
                                onValueChange={(value) =>
                                  updateProgress(assignment.id, value)
                                }
                              >
                                <SelectTrigger className="w-32 h-9">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="NOT_STARTED">
                                    Not Started
                                  </SelectItem>
                                  <SelectItem value="IN_PROGRESS">
                                    In Progress
                                  </SelectItem>
                                  <SelectItem value="COMPLETED">
                                    Completed
                                  </SelectItem>
                                  <SelectItem value="REVIEWED">
                                    Reviewed
                                  </SelectItem>
                                </SelectContent>
                              </Select>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Extend Deadline
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Plus, Edit, User, Mail, Phone, Search, Filter, Users, UserCheck, MoreHorizontal, Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import toast from "react-hot-toast"

interface Marker {
  id: number
  fullName: string
  faculty: {
    id: number
    name: string
    email: string
    employeeId: string
    designation: string
    department: {
      id: number
      name: string
      course: {
        id: number
        name: string
      }
    }
    address: string
    bloodGroup: string
    nationality: string
    emergencyContact: string
    gender: string
    dob: string
    phone: string
  }
  isModerator: boolean
  markingAssignments: any[]
}

interface MarkerFormData {
  staffId: string
  isModerator: boolean
}

export default function MarkerManagement() {
  const [markers, setMarkers] = useState<Marker[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMarker, setEditingMarker] = useState<Marker | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [filterRole, setFilterRole] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState<MarkerFormData>({
    staffId: "",
    isModerator: false,
  })


  // Mock data with loading simulation
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 800))

      const mockMarkers: Marker[] = [
        {
          id: 1,
          fullName: "Dr. Aditi Sharma",
          faculty: {
            id: 16,
            name: "Dr. Aditi Sharma",
            email: "aditi.sharma@university.edu",
            employeeId: "CSE005",
            designation: "ASSOCIATE_PROFESSOR",
            department: {
              id: 2,
              name: "Computer Science",
              course: {
                id: 1,
                name: "B.Tech",
              },
            },
            address: "Delhi",
            bloodGroup: "O+",
            nationality: "Indian",
            emergencyContact: "9812345678",
            gender: "FEMALE",
            dob: "1980-04-12",
            phone: "9876543210",
          },
          isModerator: false,
          markingAssignments: [],
        },
        {
          id: 2,
          fullName: "Prof. Rajesh Kumar",
          faculty: {
            id: 17,
            name: "Prof. Rajesh Kumar",
            email: "rajesh.kumar@university.edu",
            employeeId: "CSE006",
            designation: "PROFESSOR",
            department: {
              id: 2,
              name: "Computer Science",
              course: {
                id: 1,
                name: "B.Tech",
              },
            },
            address: "Mumbai",
            bloodGroup: "A+",
            nationality: "Indian",
            emergencyContact: "9823456789",
            gender: "MALE",
            dob: "1975-08-20",
            phone: "9887654321",
          },
          isModerator: true,
          markingAssignments: [],
        },
        {
          id: 3,
          fullName: "Dr. Priya Patel",
          faculty: {
            id: 18,
            name: "Dr. Priya Patel",
            email: "priya.patel@university.edu",
            employeeId: "ECE003",
            designation: "ASSISTANT_PROFESSOR",
            department: {
              id: 3,
              name: "Electronics",
              course: {
                id: 1,
                name: "B.Tech",
              },
            },
            address: "Bangalore",
            bloodGroup: "B+",
            nationality: "Indian",
            emergencyContact: "9834567890",
            gender: "FEMALE",
            dob: "1985-03-15",
            phone: "9898765432",
          },
          isModerator: false,
          markingAssignments: [],
        },
      ]
      setMarkers(mockMarkers)
      setIsLoading(false)
    }

    loadData()
  }, [])

  // Filtered markers based on search and filters
  const filteredMarkers = useMemo(() => {
    return markers.filter((marker) => {
      const matchesSearch =
        marker.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        marker.faculty.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        marker.faculty.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        marker.faculty.department.name.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesDepartment = filterDepartment === "all" || marker.faculty.department.name === filterDepartment
      const matchesRole =
        filterRole === "all" ||
        (filterRole === "moderator" && marker.isModerator) ||
        (filterRole === "marker" && !marker.isModerator)

      return matchesSearch && matchesDepartment && matchesRole
    })
  }, [markers, searchTerm, filterDepartment, filterRole])

  // Get unique departments for filter
  const uniqueDepartments = useMemo(() => {
    const departments = markers.map((marker) => marker.faculty.department.name)
    return [...new Set(departments)]
  }, [markers])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingMarker) {
        const updatedMarkers = markers.map((marker) =>
          marker.id === editingMarker.id ? { ...marker, isModerator: formData.isModerator } : marker,
        )
        setMarkers(updatedMarkers)
        toast.success("Marker updated successfully")
        
      } else {
        toast.success("Marker created successfully")
    
      }

      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      toast.error("Failed to save marker")
    }
  }

  const handleEdit = (marker: Marker) => {
    setEditingMarker(marker)
    setFormData({
      staffId: marker.faculty.id.toString(),
      isModerator: marker.isModerator,
    })
    setIsDialogOpen(true)
  }

  const toggleModerator = async (markerId: number, currentStatus: boolean) => {
    try {
      const updatedMarkers = markers.map((marker) =>
        marker.id === markerId ? { ...marker, isModerator: !currentStatus } : marker,
      )
      setMarkers(updatedMarkers)
      toast.success(`Moderator status ${!currentStatus ? "enabled" : "disabled"}`)
    } catch (error) {
      toast.error("Failed to update moderator status")
    }
  }

  const resetForm = () => {
    setFormData({
      staffId: "",
      isModerator: false,
    })
    setEditingMarker(null)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setFilterDepartment("all")
    setFilterRole("all")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
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
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full" />
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
              <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              Marker Management
            </CardTitle>
            <CardDescription className="text-base">
              Manage markers and their moderator status for exam evaluation
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
                      placeholder="Search markers by name, email, ID, or department..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                    <SelectTrigger className="w-40 h-11">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {uniqueDepartments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger className="w-32 h-11">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="moderator">Moderators</SelectItem>
                      <SelectItem value="marker">Markers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Filter Summary and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium">{filteredMarkers.length}</span> of{" "}
                    <span className="font-medium">{markers.length}</span> markers
                  </p>
                  {(searchTerm || filterDepartment !== "all" || filterRole !== "all") && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 lg:px-3">
                      Clear filters
                    </Button>
                  )}
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={resetForm} className="h-11">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Marker
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>{editingMarker ? "Edit Marker" : "Create New Marker"}</DialogTitle>
                      <DialogDescription>
                        {editingMarker ? "Update marker details" : "Add a new marker to the system"}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {!editingMarker && (
                        <div className="space-y-2">
                          <Label htmlFor="staffId">Staff ID</Label>
                          <Input
                            id="staffId"
                            type="number"
                            value={formData.staffId}
                            onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
                            required
                            placeholder="Enter staff ID"
                          />
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="isModerator"
                          checked={formData.isModerator}
                          onCheckedChange={(checked) => setFormData({ ...formData, isModerator: checked })}
                        />
                        <Label htmlFor="isModerator">Is Moderator</Label>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">{editingMarker ? "Update" : "Create"} Marker</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Enhanced Table or Empty State */}
            {filteredMarkers.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No markers found</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    {searchTerm || filterDepartment !== "all" || filterRole !== "all"
                      ? "Try adjusting your search or filters to find what you're looking for."
                      : "Get started by adding your first marker."}
                  </p>
                  {searchTerm || filterDepartment !== "all" || filterRole !== "all" ? (
                    <Button variant="outline" onClick={clearFilters}>
                      Clear filters
                    </Button>
                  ) : (
                    <Button onClick={() => setIsDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Marker
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Faculty Details</TableHead>
                      <TableHead className="font-semibold">Department</TableHead>
                      <TableHead className="font-semibold">Designation</TableHead>
                      <TableHead className="font-semibold">Contact</TableHead>
                      <TableHead className="font-semibold">Role</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMarkers.map((marker) => (
                      <TableRow key={marker.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-600 text-white font-semibold">
                                {getInitials(marker.fullName)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-base">{marker.fullName}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {marker.faculty.email}
                              </div>
                              <div className="text-sm text-muted-foreground">ID: {marker.faculty.employeeId}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{marker.faculty.department.name}</div>
                            <div className="text-sm text-muted-foreground">{marker.faculty.department.course.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-medium">
                            {marker.faculty.designation.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {marker.faculty.phone}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Emergency: {marker.faculty.emergencyContact}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Switch
                              checked={marker.isModerator}
                              onCheckedChange={() => toggleModerator(marker.id, marker.isModerator)}
                            />
                            <div className="flex items-center gap-2">
                              {marker.isModerator ? (
                                <UserCheck className="h-4 w-4 text-green-600" />
                              ) : (
                                <User className="h-4 w-4 text-gray-500" />
                              )}
                              <Badge variant={marker.isModerator ? "default" : "secondary"}>
                                {marker.isModerator ? "Moderator" : "Marker"}
                              </Badge>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => handleEdit(marker)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit marker</TooltipContent>
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
                                <DropdownMenuItem onClick={() => handleEdit(marker)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleModerator(marker.id, marker.isModerator)}>
                                  {marker.isModerator ? (
                                    <>
                                      <User className="h-4 w-4 mr-2" />
                                      Remove Moderator
                                    </>
                                  ) : (
                                    <>
                                      <UserCheck className="h-4 w-4 mr-2" />
                                      Make Moderator
                                    </>
                                  )}
                                </DropdownMenuItem>
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

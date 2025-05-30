/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Search, Filter, Eye, CheckCircle } from "lucide-react"


import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import type { Grievance, GrievanceStatus, GrievanceCategory } from "@/types/grievance"
import { getGrievances, updateGrievance } from "@/services/grievance-service"
import toast from "react-hot-toast"

const statusColors: Record<GrievanceStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  IN_REVIEW: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  RESOLVED: "bg-green-100 text-green-800 hover:bg-green-100",
  REJECTED: "bg-red-100 text-red-800 hover:bg-red-100",
}

const categoryColors: Record<GrievanceCategory, string> = {
  ACADEMIC: "bg-purple-100 text-purple-800 hover:bg-purple-100",
  ADMINISTRATIVE: "bg-indigo-100 text-indigo-800 hover:bg-indigo-100",
  TECHNICAL: "bg-cyan-100 text-cyan-800 hover:bg-cyan-100",
  OTHER: "bg-gray-100 text-gray-800 hover:bg-gray-100",
}

const responseFormSchema = z.object({
  status: z.enum(["PENDING", "IN_REVIEW", "RESOLVED", "REJECTED"] as const),
  response: z.string().min(5, "Response must be at least 5 characters"),
  actionTaken: z.string().min(5, "Action taken must be at least 5 characters"),
})

export default function AdminGrievancesPage() {
  const [grievances, setGrievances] = useState<Grievance[]>([])
  const [filteredGrievances, setFilteredGrievances] = useState<Grievance[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null)
  const [respondingTo, setRespondingTo] = useState<Grievance | null>(null)
  const [activeTab, setActiveTab] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL")


  const responseForm = useForm<z.infer<typeof responseFormSchema>>({
    resolver: zodResolver(responseFormSchema),
    defaultValues: {
      status: "IN_REVIEW",
      response: "",
      actionTaken: "",
    },
  })

  const fetchGrievances = async () => {
    setIsLoading(true)
    try {
      const data = await getGrievances()
      setGrievances(data)
      setFilteredGrievances(data)
    } catch (error) {
      toast.error("Failed to fetch grievances");
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGrievances()
  }, [])

  useEffect(() => {
    if (respondingTo) {
      responseForm.reset({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        status: respondingTo.status as any,
        response: respondingTo.response || "",
        actionTaken: respondingTo.actionTaken || "",
      })
    }
  }, [respondingTo, responseForm])

  useEffect(() => {
    let result = [...grievances]

    // Apply tab filter
    if (activeTab !== "all") {
      result = result.filter((grievance) => grievance.status === activeTab)
    }

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (grievance) =>
          grievance.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          grievance.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          grievance.submittedByName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          grievance.submittedByEmail.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply category filter
    if (categoryFilter !== "ALL") {
      result = result.filter((grievance) => grievance.category === categoryFilter)
    }

    setFilteredGrievances(result)
  }, [activeTab, searchTerm, categoryFilter, grievances])

  const handleResponse = async (values: z.infer<typeof responseFormSchema>) => {
    if (!respondingTo?.id) return

    setIsSubmitting(true)
    try {
      const updatedGrievance = await updateGrievance(respondingTo.id, values)

      // Update local state
      setGrievances((prev) => prev.map((g) => (g.id === updatedGrievance.id ? updatedGrievance : g)))

      toast.success("Grievance updated successfully");
      
      setRespondingTo(null)
    } catch (error) {
      toast.error("Failed to update grievance");
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const getStatusCounts = () => {
    const counts = {
      PENDING: 0,
      IN_REVIEW: 0,
      RESOLVED: 0,
      REJECTED: 0,
    }

    grievances.forEach((grievance) => {
      counts[grievance.status]++
    })

    return counts
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Grievance Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Grievances</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{grievances.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <p className="text-3xl font-bold text-yellow-600">{statusCounts.PENDING}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{statusCounts.IN_REVIEW}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{statusCounts.RESOLVED}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Grievances</CardTitle>
          <CardDescription>Manage and respond to student and faculty grievances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search grievances..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Categories</SelectItem>
                <SelectItem value="ACADEMIC">Academic</SelectItem>
                <SelectItem value="ADMINISTRATIVE">Administrative</SelectItem>
                <SelectItem value="TECHNICAL">Technical</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="PENDING">Pending</TabsTrigger>
              <TabsTrigger value="IN_REVIEW">In Progress</TabsTrigger>
              <TabsTrigger value="RESOLVED">Resolved</TabsTrigger>
              <TabsTrigger value="REJECTED">Rejected</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {isLoading ? (
                <div className="flex justify-center py-16">
                  <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
                </div>
              ) : filteredGrievances.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  No grievances found matching your criteria.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Submitted By</TableHead>
                        <TableHead>Submitted At</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredGrievances.map((grievance) => (
                        <TableRow key={grievance.id}>
                          <TableCell className="font-medium">{grievance.title}</TableCell>
                          <TableCell>
                            <Badge className={categoryColors[grievance.category as GrievanceCategory]}>
                              {grievance.category}
                            </Badge>
                          </TableCell>
                          <TableCell>{grievance.submittedByName}</TableCell>
                          <TableCell>{formatDate(grievance.submittedAt)}</TableCell>
                          <TableCell>
                            <Badge className={statusColors[grievance.status]}>{grievance.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSelectedGrievance(grievance)}
                                title="View Details"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setRespondingTo(grievance)}
                                title="Respond"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* View Grievance Dialog */}
      <Dialog open={!!selectedGrievance} onOpenChange={(open) => !open && setSelectedGrievance(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedGrievance?.title}</span>
              {selectedGrievance?.status && (
                <Badge className={statusColors[selectedGrievance.status]}>{selectedGrievance.status}</Badge>
              )}
            </DialogTitle>
            <DialogDescription>Grievance Details</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
              <p className="whitespace-pre-line">{selectedGrievance?.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Category</h4>
                <p>{selectedGrievance?.category}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Submitted By</h4>
                <p>
                  {selectedGrievance?.submittedByName}
                  <br />
                  <span className="text-sm text-muted-foreground">{selectedGrievance?.submittedByEmail}</span>
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Timeline</h4>
              <p>
                Submitted: {selectedGrievance?.submittedAt && formatDate(selectedGrievance.submittedAt)}
                {selectedGrievance?.updatedAt && selectedGrievance.updatedAt !== selectedGrievance.submittedAt && (
                  <>
                    <br />
                    Last Updated: {formatDate(selectedGrievance.updatedAt)}
                  </>
                )}
              </p>
            </div>

            {selectedGrievance?.response && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Response</h4>
                <p className="whitespace-pre-line">{selectedGrievance.response}</p>
              </div>
            )}

            {selectedGrievance?.actionTaken && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Action Taken</h4>
                <p className="whitespace-pre-line">{selectedGrievance.actionTaken}</p>
              </div>
            )}

            {selectedGrievance?.attachmentUrl && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Attachment</h4>
                <a
                  href={selectedGrievance.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Attachment
                </a>
              </div>
            )}
          </div>

          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={() => setSelectedGrievance(null)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setRespondingTo(selectedGrievance)
                setSelectedGrievance(null)
              }}
            >
              Respond
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Respond to Grievance Dialog */}
      <Dialog open={!!respondingTo} onOpenChange={(open) => !open && setRespondingTo(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Respond to Grievance</DialogTitle>
            <DialogDescription>
              Update the status, provide a response, and document actions taken for this grievance.
            </DialogDescription>
          </DialogHeader>

          <Form {...responseForm}>
            <form onSubmit={responseForm.handleSubmit(handleResponse)} className="space-y-4">
              <div className="mb-4">
                <h3 className="font-medium">{respondingTo?.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{respondingTo?.description}</p>
              </div>

              <FormField
                control={responseForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="IN_REVIEW">In Progress</SelectItem>
                        <SelectItem value="RESOLVED">Resolved</SelectItem>
                        <SelectItem value="REJECTED">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={responseForm.control}
                name="response"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Response</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide a response to the grievance"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={responseForm.control}
                name="actionTaken"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Action Taken</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe actions taken to address this grievance"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-4">
                <Button variant="outline" type="button" onClick={() => setRespondingTo(null)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Response"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

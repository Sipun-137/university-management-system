/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { Loader2, FileText, Calendar, Users } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import type { Notice, NoticeType } from "@/types/notice"
import { getNotices } from "@/services/NoticeService"
import toast from "react-hot-toast"

const noticeTypeColors: Record<NoticeType, string> = {
  EXAM: "bg-red-100 text-red-800 hover:bg-red-100",
  ASSIGNMENT: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  EVENT: "bg-green-100 text-green-800 hover:bg-green-100",
  ANNOUNCEMENT: "bg-purple-100 text-purple-800 hover:bg-purple-100",
  OTHER: "bg-gray-100 text-gray-800 hover:bg-gray-100",
}

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("ALL")
  const [audienceFilter, setAudienceFilter] = useState<string>("ALL")

  const fetchNotices = async () => {
    setIsLoading(true)
    try {
      const data = await getNotices()
      setNotices(data)
      setFilteredNotices(data)
    } catch (error) {
      toast.error("Failed to fetch notices")
      
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchNotices()
  }, [])

  useEffect(() => {
    let result = [...notices]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (notice) =>
          notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notice.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply type filter
    if (typeFilter !== "ALL") {
      result = result.filter((notice) => notice.type === typeFilter)
    }

    // Apply audience filter
    if (audienceFilter !== "ALL") {
      result = result.filter((notice) => notice.targetAudience === audienceFilter)
    }

    setFilteredNotices(result)
  }, [searchTerm, typeFilter, audienceFilter, notices])

  // Get unique audience values for filter
  const uniqueAudiences = ["ALL", ...new Set(notices.map((notice) => notice.targetAudience))]

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Notices & Announcements</h1>
          <p className="text-muted-foreground mt-1">Stay updated with the latest notices and announcements</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Input
            placeholder="Search notices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-[200px]"
          />

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Types</SelectItem>
              <SelectItem value="EXAM">Exam</SelectItem>
              <SelectItem value="ASSIGNMENT">Assignment</SelectItem>
              <SelectItem value="EVENT">Event</SelectItem>
              <SelectItem value="ANNOUNCEMENT">Announcement</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select value={audienceFilter} onValueChange={setAudienceFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Filter by audience" />
            </SelectTrigger>
            <SelectContent>
              {uniqueAudiences.map((audience,index) => (
                <SelectItem key={index} value={audience}>
                  {audience}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
        </div>
      ) : filteredNotices.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent>
            <div className="flex flex-col items-center gap-2">
              <FileText className="h-12 w-12 text-muted-foreground" />
              <h3 className="text-xl font-semibold mt-4">No notices found</h3>
              <p className="text-muted-foreground">
                {searchTerm || typeFilter !== "ALL" || audienceFilter !== "ALL"
                  ? "Try changing your search or filter criteria"
                  : "There are no notices available at the moment"}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotices.map((notice,index) => (
            <Card key={notice.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge className={noticeTypeColors[notice.type as NoticeType]}>{notice.type}</Badge>
                </div>
                <CardTitle className="mt-2">{notice.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{notice.description}</p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>
                      Valid: {notice.validFrom} to {notice.validTo}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    <span>For: {notice.targetAudience}</span>
                  </div>
                </div>
              </CardContent>
              {notice.attachmentUrl && (
                <>
                  <Separator />
                  <CardFooter className="pt-3">
                    <Button variant="outline" className="w-full" asChild>
                      <a href={notice.attachmentUrl} target="_blank" rel="noopener noreferrer">
                        <FileText className="mr-2 h-4 w-4" />
                        View Attachment
                      </a>
                    </Button>
                  </CardFooter>
                </>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

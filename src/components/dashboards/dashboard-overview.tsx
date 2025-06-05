"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, ClipboardList, TrendingUp, Calendar, Clock, AlertCircle, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function DashboardOverview() {
  const stats = [
    {
      title: "Total Exams",
      value: "24",
      description: "+3 from last month",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Active Markers",
      value: "12",
      description: "8 moderators, 4 markers",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: "+2",
      trendUp: true,
    },
    {
      title: "Assignments",
      value: "36",
      description: "28 completed, 8 pending",
      icon: ClipboardList,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "78%",
      trendUp: true,
    },
    {
      title: "Completion Rate",
      value: "78%",
      description: "Above target of 75%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: "+5%",
      trendUp: true,
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "exam_created",
      title: "New exam created",
      description: "Mathematics I - Final Exam",
      time: "2 hours ago",
      icon: BookOpen,
      color: "bg-blue-500",
    },
    {
      id: 2,
      type: "marker_assigned",
      title: "Marker assigned",
      description: "Dr. Aditi Sharma assigned to Physics exam",
      time: "4 hours ago",
      icon: Users,
      color: "bg-green-500",
    },
    {
      id: 3,
      type: "assignment_completed",
      title: "Assignment completed",
      description: "Engineering Physics marking completed",
      time: "6 hours ago",
      icon: CheckCircle2,
      color: "bg-orange-500",
    },
    {
      id: 4,
      type: "deadline_approaching",
      title: "Deadline approaching",
      description: "Data Structures exam due in 2 days",
      time: "1 day ago",
      icon: AlertCircle,
      color: "bg-red-500",
    },
  ]

  const upcomingDeadlines = [
    {
      exam: "Data Structures - Final",
      marker: "Dr. Priya Patel",
      dueDate: "Dec 15, 2024",
      progress: 65,
      status: "in_progress",
    },
    {
      exam: "Computer Networks - Mid Sem",
      marker: "Prof. Rajesh Kumar",
      dueDate: "Dec 18, 2024",
      progress: 30,
      status: "not_started",
    },
    {
      exam: "Database Systems - Final",
      marker: "Dr. Aditi Sharma",
      dueDate: "Dec 20, 2024",
      progress: 90,
      status: "review",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back! 👋</h1>
        <p className="text-muted-foreground text-lg">Here&apos;s what&apos;s happening with your exam management system today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <Badge variant={stat.trendUp ? "default" : "secondary"} className="text-xs">
                  {stat.trend}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest actions in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`h-8 w-8 rounded-full ${activity.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <activity.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                  </div>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start h-auto p-4" asChild>
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="font-medium">Create New Exam</span>
                </div>
                <span className="text-xs text-muted-foreground">Set up a new examination</span>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start h-auto p-4" asChild>
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">Add Marker</span>
                </div>
                <span className="text-xs text-muted-foreground">Register a new faculty marker</span>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start h-auto p-4" asChild>
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  <span className="font-medium">Assign Marking</span>
                </div>
                <span className="text-xs text-muted-foreground">Create marking assignments</span>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Deadlines
          </CardTitle>
          <CardDescription>Marking assignments that need attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{deadline.exam}</h4>
                    <Badge
                      variant={
                        deadline.status === "review"
                          ? "default"
                          : deadline.status === "in_progress"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {deadline.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Assigned to {deadline.marker}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress value={deadline.progress} className="flex-1 h-2" />
                    <span className="text-xs text-muted-foreground">{deadline.progress}%</span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="text-sm font-medium">Due {deadline.dueDate}</p>
                  <p className="text-xs text-muted-foreground">
                    {deadline.progress < 50 ? "Behind schedule" : deadline.progress > 80 ? "On track" : "In progress"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

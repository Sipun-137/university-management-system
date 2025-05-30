/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  List,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Calendar,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import type { GrievanceStatus, GrievanceCategory } from "@/types/grievance";
import { GetStats } from "@/services/grievance-service";
import toast from "react-hot-toast";

const statusColors: Record<GrievanceStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  IN_REVIEW: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  RESOLVED: "bg-green-100 text-green-800 hover:bg-green-100",
  REJECTED: "bg-red-100 text-red-800 hover:bg-red-100",
};

const categoryColors: Record<GrievanceCategory, string> = {
  ACADEMIC: "bg-purple-100 text-purple-800 hover:bg-purple-100",
  ADMINISTRATIVE: "bg-indigo-100 text-indigo-800 hover:bg-indigo-100",
  TECHNICAL: "bg-cyan-100 text-cyan-800 hover:bg-cyan-100",
  OTHER: "bg-gray-100 text-gray-800 hover:bg-gray-100",
};

interface grievanceStatsI {
  total: number;
  statusCounts: {
    PENDING: number;
    IN_REVIEW: number;
    RESOLVED: number;
    REJECTED: number;
  };
  categoryCounts: {
    ACADEMIC: number;
    ADMINISTRATIVE: number;
    TECHNICAL: number;
    OTHER: number;
  };
}

export default function GrievancesIndexPage() {
  const [grievancesStats, setGrievanceStats] = useState<grievanceStatsI>({
    total: 0,
    statusCounts: { PENDING: 0, IN_REVIEW: 0, RESOLVED: 0, REJECTED: 0 },
    categoryCounts: { ACADEMIC: 0, ADMINISTRATIVE: 0, TECHNICAL: 0, OTHER: 0 },
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchGrievanceStats = async () => {
      try {
        const data = await GetStats();
        setGrievanceStats(data);
      } catch (error) {
        toast.error("Failed to fetch grievance statistics");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGrievanceStats();
  }, []);

  const getStats = () => {
    const total = grievancesStats.total;
    const statusCounts = grievancesStats.statusCounts;
    const categoryCounts = grievancesStats.categoryCounts;

    const resolvedPercentage =
      total > 0 ? Math.round((statusCounts.RESOLVED / total) * 100) : 0;
    const avgResolutionTime = "3-5 days"; // This would be calculated from actual data

    return {
      total,
      statusCounts,
      categoryCounts,
      resolvedPercentage,
      avgResolutionTime,
    };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                onClick={() => router.push("/dashboard/grievances/submit")}
              >
                <FileText className="mr-2 h-5 w-5" />
                Submit New Grievance
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-blue-600 font-semibold"
                onClick={() => router.push("/dashboard/grievances/my")}
              >
                <List className="mr-2 h-5 w-5" />
                Track My Grievances
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Statistics Overview */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Grievance Statistics
          </h2>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">
                      Total Grievances
                    </p>
                    <p className="text-3xl font-bold">{stats.total}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">
                      Resolution Rate
                    </p>
                    <p className="text-3xl font-bold">
                      {stats.resolvedPercentage}%
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">
                      Avg. Resolution Time
                    </p>
                    <p className="text-2xl font-bold">
                      {stats.avgResolutionTime}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">
                      Active Cases
                    </p>
                    <p className="text-3xl font-bold">
                      {stats.statusCounts.PENDING +
                        stats.statusCounts.IN_REVIEW}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Status Breakdown */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-blue-600" />
                  Status Breakdown
                </CardTitle>
                <CardDescription>
                  Current status of all grievances
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Badge className={statusColors.PENDING}>Pending</Badge>
                      <span className="ml-2 text-sm text-muted-foreground">
                        Awaiting review
                      </span>
                    </div>
                    <span className="font-semibold">
                      {stats.statusCounts.PENDING}
                    </span>
                  </div>
                  <Progress
                    value={
                      stats.total > 0
                        ? (stats.statusCounts.PENDING / stats.total) * 100
                        : 0
                    }
                    className="h-2"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Badge className={statusColors.IN_REVIEW}>
                        In Progress
                      </Badge>
                      <span className="ml-2 text-sm text-muted-foreground">
                        Being addressed
                      </span>
                    </div>
                    <span className="font-semibold">
                      {stats.statusCounts.IN_REVIEW}
                    </span>
                  </div>
                  <Progress
                    value={
                      stats.total > 0
                        ? (stats.statusCounts.IN_REVIEW / stats.total) * 100
                        : 0
                    }
                    className="h-2"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Badge className={statusColors.RESOLVED}>Resolved</Badge>
                      <span className="ml-2 text-sm text-muted-foreground">
                        Successfully closed
                      </span>
                    </div>
                    <span className="font-semibold">
                      {stats.statusCounts.RESOLVED}
                    </span>
                  </div>
                  <Progress
                    value={
                      stats.total > 0
                        ? (stats.statusCounts.RESOLVED / stats.total) * 100
                        : 0
                    }
                    className="h-2"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Badge className={statusColors.REJECTED}>Rejected</Badge>
                      <span className="ml-2 text-sm text-muted-foreground">
                        Not actionable
                      </span>
                    </div>
                    <span className="font-semibold">
                      {stats.statusCounts.REJECTED}
                    </span>
                  </div>
                  <Progress
                    value={
                      stats.total > 0
                        ? (stats.statusCounts.REJECTED / stats.total) * 100
                        : 0
                    }
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-purple-600" />
                  Category Distribution
                </CardTitle>
                <CardDescription>Grievances by category type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(stats.categoryCounts).map(
                  ([category, count]) => (
                    <div key={category} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Badge
                            className={
                              categoryColors[category as GrievanceCategory]
                            }
                          >
                            {category}
                          </Badge>
                        </div>
                        <span className="font-semibold">{count}</span>
                      </div>
                      <Progress
                        value={
                          stats.total > 0 ? (count / stats.total) * 100 : 0
                        }
                        className="h-2"
                      />
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Grievances */}
        {/* {grievances.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Recent Grievances</h2>
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Latest Submissions</CardTitle>
                <CardDescription>Most recently submitted grievances (anonymized)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getRecentGrievances().map((grievance, index) => (
                    <div key={grievance.id || index}>
                      <div className="flex items-center justify-between py-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className={categoryColors[grievance.category as GrievanceCategory]}>
                              {grievance.category}
                            </Badge>
                            <Badge className={statusColors[grievance.status]}>{grievance.status}</Badge>
                          </div>
                          <h4 className="font-medium text-gray-900">{grievance.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-1">{grievance.description}</p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          {formatDate(grievance.submittedAt)}
                        </div>
                      </div>
                      {index < getRecentGrievances().length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )} */}

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Submit a Grievance</CardTitle>
                  <CardDescription>Report issues and concerns</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Have an issue or complaint? Submit a grievance to bring it to
                the attention of university administration. We take all
                grievances seriously and will work to address your concerns
                promptly.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Academic issues and concerns
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Administrative problems
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Technical difficulties
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Other university-related issues
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => router.push("/dashboard/grievances/submit")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Submit New Grievance
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg mr-4">
                  <List className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Track Your Grievances
                  </CardTitle>
                  <CardDescription>
                    Monitor status and responses
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Check the status of your submitted grievances, view responses
                from administrators, and see what actions have been taken to
                address your concerns. Stay informed throughout the resolution
                process.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Real-time status updates
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Administrative responses
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Action taken documentation
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Complete grievance history
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push("/dashboard/grievances/my")}
              >
                <List className="mr-2 h-4 w-4" />
                View My Grievances
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Information Section */}
        <div className="mt-12">
          <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">
                  How the Grievance Process Works
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                      1
                    </div>
                    <h4 className="font-semibold mb-2">Submit</h4>
                    <p className="text-sm text-gray-600">
                      Fill out the grievance form with detailed information
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                      2
                    </div>
                    <h4 className="font-semibold mb-2">Review</h4>
                    <p className="text-sm text-gray-600">
                      Administration reviews your grievance within 24-48 hours
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                      3
                    </div>
                    <h4 className="font-semibold mb-2">Action</h4>
                    <p className="text-sm text-gray-600">
                      Appropriate actions are taken to address your concerns
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                      4
                    </div>
                    <h4 className="font-semibold mb-2">Resolution</h4>
                    <p className="text-sm text-gray-600">
                      You receive updates and final resolution details
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

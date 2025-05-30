/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, FileText, Clock, AlertCircle } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Grievance, GrievanceStatus } from "@/types/grievance";
import { getMyGrievances } from "@/services/grievance-service";
import toast from "react-hot-toast";

const statusColors: Record<GrievanceStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  IN_REVIEW: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  RESOLVED: "bg-green-100 text-green-800 hover:bg-green-100",
  REJECTED: "bg-red-100 text-red-800 hover:bg-red-100",
};

export default function MyGrievancesPage() {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(
    null
  );
  const router = useRouter();

  const fetchGrievances = async () => {
    setIsLoading(true);
    try {
      const data = await getMyGrievances();
      setGrievances(data);
    } catch (error) {
      toast.error("Failed to fetch your grievances");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Grievances</h1>
          <p className="text-muted-foreground mt-1">
            View and track your submitted grievances
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => router.push("/dashboard/grievances/submit")}
            className="whitespace-nowrap"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Grievance
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
        </div>
      ) : grievances.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent>
            <div className="flex flex-col items-center gap-2">
              <AlertCircle className="h-12 w-12 text-muted-foreground" />
              <h3 className="text-xl font-semibold mt-4">
                No grievances found
              </h3>
              <p className="text-muted-foreground">
                {userEmail
                  ? "You haven't submitted any grievances yet"
                  : "Enter your email to view your grievances"}
              </p>
              {userEmail && (
                <Button
                  onClick={() => router.push("/grievances/submit")}
                  className="mt-4"
                >
                  Submit a Grievance
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grievances.map((grievance) => (
            <Card key={grievance.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge className={statusColors[grievance.status]}>
                    {grievance.status}
                  </Badge>
                </div>
                <CardTitle className="mt-2 line-clamp-1">
                  {grievance.title}
                </CardTitle>
                <CardDescription className="line-clamp-1">
                  {grievance.category}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">
                  {grievance.description}
                </p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>Submitted: {formatDate(grievance.submittedAt)}</span>
                  </div>
                </div>
              </CardContent>
              <Separator />
              <CardFooter className="pt-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedGrievance(grievance)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Grievance Details Dialog */}
      <Dialog
        open={!!selectedGrievance}
        onOpenChange={(open) => !open && setSelectedGrievance(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedGrievance?.title}</span>
              {selectedGrievance?.status && (
                <Badge className={statusColors[selectedGrievance.status]}>
                  {selectedGrievance.status}
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription>Grievance Details</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Description
              </h4>
              <p className="whitespace-pre-line">
                {selectedGrievance?.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Category
                </h4>
                <p>{selectedGrievance?.category}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Submitted By
                </h4>
                <p>{selectedGrievance?.submittedByName}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Timeline
              </h4>
              <p>
                Submitted:{" "}
                {selectedGrievance?.submittedAt &&
                  formatDate(selectedGrievance.submittedAt)}
                {selectedGrievance?.updatedAt &&
                  selectedGrievance.updatedAt !==
                    selectedGrievance.submittedAt && (
                    <>
                      <br />
                      Last Updated: {formatDate(selectedGrievance.updatedAt)}
                    </>
                  )}
              </p>
            </div>

            {selectedGrievance?.response && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Response
                </h4>
                <p className="whitespace-pre-line">
                  {selectedGrievance.response}
                </p>
              </div>
            )}

            {selectedGrievance?.actionTaken && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Action Taken
                </h4>
                <p className="whitespace-pre-line">
                  {selectedGrievance.actionTaken}
                </p>
              </div>
            )}

            {selectedGrievance?.attachmentUrl && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Attachment
                </h4>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format, parse } from "date-fns";
import { CalendarIcon, Loader2, Trash2, Eye, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import type { Notice, NoticeType } from "@/types/notice";
import {
  createNotice,
  deleteNotice,
  getNotices,
  updateNotice,
} from "@/services/NoticeService";
import toast from "react-hot-toast";

const noticeTypeColors: Record<NoticeType, string> = {
  GENERAL: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
  URGENT: "bg-orange-100 text-orange-800 hover:bg-orange-100",
  EXAM: "bg-red-100 text-red-800 hover:bg-red-100",
  ASSIGNMENT: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  EVENT: "bg-green-100 text-green-800 hover:bg-green-100",
  ANNOUNCEMENT: "bg-purple-100 text-purple-800 hover:bg-purple-100",
  OTHER: "bg-gray-100 text-gray-800 hover:bg-gray-100",
};

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  attachmentUrl: z
    .union([
      z.string().url("Must be a valid URL"),
      z.string().length(0),
      z.null(),
    ])
    .optional(),
  type: z.enum([
    "EXAM",
    "ASSIGNMENT",
    "EVENT",
    "ANNOUNCEMENT",
    "OTHER",
  ] as const),
  targetAudience: z
    .string()
    .min(3, "Target audience must be at least 3 characters"),
  validFrom: z.date(),
  validTo: z.date(),
});

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [viewNotice, setViewNotice] = useState<Notice | null>(null);
  const [editNotice, setEditNotice] = useState<Notice | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      attachmentUrl: "",
      type: "ANNOUNCEMENT",
      targetAudience: "",
      validFrom: new Date(),
      validTo: new Date(),
    },
  });
  const editForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      attachmentUrl: "",
      type: "ANNOUNCEMENT",
      targetAudience: "",
      validFrom: new Date(),
      validTo: new Date(),
    },
  });

  const fetchNotices = async () => {
    setIsLoading(true);
    try {
      const data = await getNotices();
      setNotices(data);
    } catch (error) {
      toast.error("Failed to fetch notices");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  useEffect(() => {
    if (editNotice) {
      editForm.reset({
        title: editNotice.title,
        description: editNotice.description,
        attachmentUrl: editNotice.attachmentUrl || "",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        type: editNotice.type as any,
        targetAudience: editNotice.targetAudience,
        validFrom: parse(editNotice.validFrom, "yyyy-MM-dd", new Date()),
        validTo: parse(editNotice.validTo, "yyyy-MM-dd", new Date()),
      });
    }
  }, [editNotice, editForm]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const newNotice = {
        ...values,
        attachmentUrl:
          values.attachmentUrl === "" ? null : values.attachmentUrl,
        validFrom: format(values.validFrom, "yyyy-MM-dd"),
        validTo: format(values.validTo, "yyyy-MM-dd"),
        createdBy: "admin", // Hardcoded for demo
      };

      const createdNotice = await createNotice(newNotice);
      toast.success("Notice created successfully");
      form.reset();
      fetchNotices();
      setViewNotice(createdNotice);
    } catch (error) {
      toast.error("Failed to create notice");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (values: z.infer<typeof formSchema>) => {
    if (!editNotice?.id) return;

    setIsSubmitting(true);
    try {
      const updatedNoticeData = {
        ...values,
        attachmentUrl:
          values.attachmentUrl === "" ? null : values.attachmentUrl,
        validFrom: format(values.validFrom, "yyyy-MM-dd"),
        validTo: format(values.validTo, "yyyy-MM-dd"),
        createdBy: editNotice.createdBy,
      };

      const updatedNotice = await updateNotice(
        editNotice.id,
        updatedNoticeData
      );
      toast.success("Notice updated successfully");
      setEditNotice(null);
      fetchNotices();
    } catch (error) {
      toast.error("Failed to update notice");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(id);
    try {
      await deleteNotice(id);
      toast.success("Notice deleted successfully");

      fetchNotices();
    } catch (error) {
      toast.error("Failed to delete notice");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Notice Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        <Card>
          <CardHeader>
            <CardTitle>Create New Notice</CardTitle>
            <CardDescription>
              Fill in the details to create a new notice for students and
              faculty.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter notice title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter notice description"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="attachmentUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Attachment URL (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/attachment.pdf"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription>
                        Link to any relevant documents or resources
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notice Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select notice type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="EXAM">Exam</SelectItem>
                            <SelectItem value="URGENT">Urgent</SelectItem>
                            <SelectItem value="GENERAL">General</SelectItem>
                            <SelectItem value="ASSIGNMENT">
                              Assignment
                            </SelectItem>
                            <SelectItem value="EVENT">Event</SelectItem>
                            <SelectItem value="ANNOUNCEMENT">
                              Announcement
                            </SelectItem>
                            <SelectItem value="OTHER">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="targetAudience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Audience</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., CSE-SEM-6" {...field} />
                        </FormControl>
                        <FormDescription>
                          Specify department, semester, or &quot;ALL&quot;
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="validFrom"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Valid From</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className="w-full pl-3 text-left font-normal"
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="validTo"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Valid To</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className="w-full pl-3 text-left font-normal"
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Notice"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manage Notices</CardTitle>
            <CardDescription>
              View, edit, and delete existing notices.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : notices.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No notices found. Create your first notice.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Valid Period</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notices.map((notice) => (
                      <TableRow key={notice.id}>
                        <TableCell className="font-medium">
                          {notice.title}
                        </TableCell>
                        <TableCell>{notice.type}</TableCell>
                        <TableCell>{notice.targetAudience}</TableCell>
                        <TableCell>
                          {notice.validFrom} to {notice.validTo}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setViewNotice(notice)}
                              title="View Notice"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditNotice(notice)}
                              title="Edit Notice"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                notice.id && handleDelete(notice.id)
                              }
                              disabled={isDeleting === notice.id}
                              title="Delete Notice"
                            >
                              {isDeleting === notice.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
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
      <Dialog
        open={!!viewNotice}
        onOpenChange={(open) => !open && setViewNotice(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{viewNotice?.title}</span>
              {viewNotice?.type && (
                <Badge
                  className={noticeTypeColors[viewNotice.type as NoticeType]}
                >
                  {viewNotice.type}
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription>Notice Details</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Description
              </h4>
              <p>{viewNotice?.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Target Audience
                </h4>
                <p>{viewNotice?.targetAudience}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Created By
                </h4>
                <p>{viewNotice?.createdBy || "Admin"}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Valid Period
              </h4>
              <p>
                From {viewNotice?.validFrom} to {viewNotice?.validTo}
              </p>
            </div>

            {viewNotice?.attachmentUrl && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Attachment
                </h4>
                <a
                  href={viewNotice.attachmentUrl}
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
            <Button variant="outline" onClick={() => setViewNotice(null)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setEditNotice(viewNotice);
                setViewNotice(null);
              }}
            >
              Edit Notice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Notice Dialog */}
      <Dialog
        open={!!editNotice}
        onOpenChange={(open) => !open && setEditNotice(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Notice</DialogTitle>
            <DialogDescription>
              Update the notice details and save changes.
            </DialogDescription>
          </DialogHeader>

          <Form {...editForm}>
            <form
              onSubmit={editForm.handleSubmit(handleUpdate)}
              className="space-y-4"
            >
              <FormField
                control={editForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter notice title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter notice description"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notice Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select notice type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="EXAM">Exam</SelectItem>
                          <SelectItem value="ASSIGNMENT">Assignment</SelectItem>
                          <SelectItem value="EVENT">Event</SelectItem>
                          <SelectItem value="ANNOUNCEMENT">
                            Announcement
                          </SelectItem>
                          <SelectItem value="OTHER">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., CSE-SEM-6" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={editForm.control}
                name="attachmentUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attachment URL (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/attachment.pdf"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="validFrom"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Valid From</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className="w-full pl-3 text-left font-normal"
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="validTo"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Valid To</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className="w-full pl-3 text-left font-normal"
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="pt-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setEditNotice(null)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

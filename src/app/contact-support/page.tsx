"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, HelpCircle, Laptop, LifeBuoy, MessageSquare, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import toast, { Toaster } from "react-hot-toast"


export default function ContactSupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userType: "",
    issueType: "",
    priority: "medium",
    subject: "",
    description: "",
  })
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))


    toast.success("Your support ticket has been submitted successfully.")

    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
        <Toaster position="bottom-right"/>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <div className="rounded-md bg-primary p-1 text-primary-foreground">UMS</div>
            <span>University Management System</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Contact
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Technical Support</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Need help with the University Management System? Our support team is here to assist you.
                </p>
              </div>
            </div>
            <div className="mx-auto mt-12 max-w-3xl">
              {isSubmitted ? (
                <Card>
                  <CardHeader>
                    <div className="flex flex-col items-center space-y-2">
                      <CheckCircle className="h-12 w-12 text-green-500" />
                      <CardTitle>Support Ticket Submitted</CardTitle>
                      <CardDescription>Thank you for contacting our support team</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-center text-muted-foreground">
                      Your support ticket has been submitted successfully. Our team will review your request and get
                      back to you as soon as possible. You will receive a confirmation email with your ticket number
                      shortly.
                    </p>
                    <div className="rounded-md bg-muted p-4">
                      <p className="text-sm font-medium">Ticket Reference</p>
                      <p className="text-sm text-muted-foreground">
                        #{Math.random().toString(36).substring(2, 10).toUpperCase()}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center space-x-4">
                    <Button variant="outline" asChild>
                      <Link href="/">Return to Home</Link>
                    </Button>
                    <Button onClick={() => setIsSubmitted(false)}>Submit Another Request</Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Submit a Support Request</CardTitle>
                    <CardDescription>
                      Please provide details about the issue you&apos;re experiencing, and we&apos;ll get back to you as soon as
                      possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john.doe@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="userType">User Type</Label>
                          <Select
                            value={formData.userType}
                            onValueChange={(value) => handleSelectChange("userType", value)}
                            required
                          >
                            <SelectTrigger id="userType">
                              <SelectValue placeholder="Select user type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="faculty">Faculty</SelectItem>
                              <SelectItem value="admin">Administrator</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="issueType">Issue Type</Label>
                          <Select
                            value={formData.issueType}
                            onValueChange={(value) => handleSelectChange("issueType", value)}
                            required
                          >
                            <SelectTrigger id="issueType">
                              <SelectValue placeholder="Select issue type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="login">Login Issues</SelectItem>
                              <SelectItem value="account">Account Management</SelectItem>
                              <SelectItem value="courses">Course Registration</SelectItem>
                              <SelectItem value="grades">Grades & Assessments</SelectItem>
                              <SelectItem value="technical">Technical Problems</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Priority</Label>
                        <RadioGroup
                          defaultValue="medium"
                          value={formData.priority}
                          onValueChange={(value: string) => handleSelectChange("priority", value)}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="low" id="low" />
                            <Label htmlFor="low" className="font-normal">
                              Low
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="medium" id="medium" />
                            <Label htmlFor="medium" className="font-normal">
                              Medium
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="high" id="high" />
                            <Label htmlFor="high" className="font-normal">
                              High
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Brief description of the issue"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Please provide detailed information about your issue..."
                          value={formData.description}
                          onChange={handleChange}
                          rows={5}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="attachments">Attachments (Optional)</Label>
                        <div className="mt-1 flex items-center space-x-2">
                          <Label
                            htmlFor="file-upload"
                            className="flex cursor-pointer items-center rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Files
                          </Label>
                          <Input id="file-upload" type="file" multiple className="hidden" onChange={handleFileChange} />
                          <p className="text-sm text-muted-foreground">
                            {files.length > 0 ? `${files.length} file(s) selected` : "No files selected"}
                          </p>
                        </div>
                        {files.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {files.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between rounded-md border border-input bg-background p-2"
                              >
                                <div className="flex items-center space-x-2">
                                  <Laptop className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{file.name}</span>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                  className="h-8 w-8 p-0"
                                >
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">Remove file</span>
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground">
                          You can upload screenshots or documents that help explain your issue (max 5MB per file).
                        </p>
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Support Request"}
                      </Button>
                    </form>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <div className="flex w-full items-center justify-center space-x-2 rounded-md bg-muted p-4">
                      <LifeBuoy className="h-5 w-5 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Need immediate assistance? Call our support hotline at{" "}
                        <span className="font-medium">+1 (555) 123-4567</span>
                      </p>
                    </div>
                    <div className="flex w-full flex-col space-y-2 rounded-md bg-muted p-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                      <div className="flex items-center space-x-2">
                        <HelpCircle className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm font-medium">Check our Knowledge Base</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="#">View FAQs</Link>
                      </Button>
                    </div>
                    <div className="flex w-full flex-col space-y-2 rounded-md bg-muted p-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm font-medium">Start a Live Chat</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="#">Chat Now</Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              )}
              <div className="mt-8 flex justify-center">
                <Link href="/">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} University Management System. All rights reserved.
          </div>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

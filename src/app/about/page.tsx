import Link from "next/link"
import { ArrowLeft, BookOpen, GraduationCap, School, Users } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
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
            <Link href="/about" className="text-sm font-medium text-foreground">
              About
            </Link>

            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Contact
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Our University</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Empowering minds and shaping futures since 1965
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight">Our Mission</h2>
                  <p className="text-muted-foreground">
                    Our mission is to provide accessible, high-quality education that empowers students to achieve their
                    full potential and contribute meaningfully to society. We strive to foster a diverse and inclusive
                    learning environment that promotes critical thinking, innovation, and lifelong learning.
                  </p>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight">Our Vision</h2>
                  <p className="text-muted-foreground">
                    To be a leading institution of higher education, recognized globally for academic excellence,
                    innovative research, and commitment to societal impact. We aim to prepare graduates who are not only
                    skilled professionals but also responsible global citizens.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/images/giet.jpeg"
                  alt="University Campus"
                  className="rounded-lg object-cover shadow-lg"
                  width={500}
                  height={400}
                />
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-2xl font-bold tracking-tight text-center">Key Statistics</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Students</CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">15,000+</div>
                    <p className="text-xs text-muted-foreground">From 50+ countries</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Faculty</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,200+</div>
                    <p className="text-xs text-muted-foreground">World-class educators</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Programs</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">200+</div>
                    <p className="text-xs text-muted-foreground">Undergraduate & graduate</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Campus Size</CardTitle>
                    <School className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">500 acres</div>
                    <p className="text-xs text-muted-foreground">State-of-the-art facilities</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="mt-12 space-y-8">
              <h2 className="text-2xl font-bold tracking-tight text-center">About the Management System</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Comprehensive Solution</CardTitle>
                    <CardDescription>Streamlining university operations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Our University Management System (UMS) is a state-of-the-art platform designed to streamline
                      administrative processes, enhance communication between students and faculty, and provide real-time
                      access to academic information. The system integrates various aspects of university management,
                      from student enrollment and course registration to faculty management and resource allocation.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                    <CardDescription>Empowering users at every level</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>Role-based access for administrators, faculty, and students</li>
                      <li>Comprehensive student information management</li>
                      <li>Course registration and academic planning tools</li>
                      <li>Attendance tracking and grade management</li>
                      <li>Financial aid and tuition management</li>
                      <li>Interactive calendars and scheduling</li>
                      <li>Secure communication channels</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="mt-12 flex justify-center">
              <Link href="/">
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8 px-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} University Management System. All rights reserved.
          </div>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="hover:underline">
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

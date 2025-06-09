"use client";

import type React from "react";

import { useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  // Settings,
  Users,
  X,
  School,
  ClipboardCheck,
  SquareUserRound,
  FileText,
  FileWarning,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { role, setRole, setAuthUser, setVerified, setUser } =
    useContext(GlobalContext);

  const logout = () => {
    Cookies.remove("token");
    localStorage.clear();
    setRole(null);
    setAuthUser(false);
    setVerified(false);
    setUser(null);
  };

  // Define navigation items based on role
  const getNavItems = () => {
    const items = [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        roles: ["ADMIN", "FACULTY", "STUDENT", "EXAM_CONTROLLER", "guest"],
      },
      {
        title: "Academics",
        href: "/dashboard/academic",
        icon: School,
        roles: ["ADMIN"],
      },
      {
        title: "Attendance",
        href: "/dashboard/attendance",
        icon: ClipboardCheck,
        roles: ["FACULTY"],
      },
      {
        title: "My Timetable",
        href: "/dashboard/my-timetable",
        icon: Calendar,
        roles: ["STUDENT"],
      },
      {
        title: "Students",
        href: "/dashboard/students",
        icon: GraduationCap,
        roles: ["ADMIN", "FACULTY"],
      },
      {
        title: "Attendance",
        href: "/dashboard/student/attendance",
        icon: ClipboardCheck,
        roles: ["STUDENT"],
      },

      {
        title: "Faculty",
        href: "/dashboard/faculty",
        icon: Users,
        roles: ["ADMIN"],
      },
      {
        title: "Subject Assignments",
        href: "/dashboard/subject-assignments",
        icon: BookOpen,
        roles: ["ADMIN"],
      },
      {
        title: "Timetable",
        href: "/dashboard/timetable",
        icon: Calendar,
        roles: ["ADMIN", "FACULTY"],
      },
      {
        title: "EXAM",
        href: "/dashboard/exam",
        icon: FileText,
        roles: ["EXAM_CONTROLLER"],
      },
      {
        title: "Marker Management",
        href: "/dashboard/marker",
        icon: Users,
        roles: ["EXAM_CONTROLLER"],
      },
      {
        title: "Notice",
        href: "/dashboard/notice",
        icon: FileText,
        roles: ["STUDENT", "FACULTY"],
      },
      {
        title: "Notice",
        href: "/dashboard/admin/notices",
        icon: FileText,
        roles: ["ADMIN"],
      },
      {
        title: "Grievances",
        href: "/dashboard/admin/grievances",
        icon: FileWarning,
        roles: ["ADMIN"],
      },
      {
        title: "Grievances",
        href: "/dashboard/grievances",
        icon: FileWarning,
        roles: ["STUDENT", "FACULTY"],
      },
      {
        title: "Profile",
        href: "/dashboard/student/profile",
        icon: SquareUserRound,
        roles: ["STUDENT"],
      },
    ];

    return items.filter((item) => item.roles.includes(role || "guest"));
  };

  const navItems = getNavItems();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTitle title="Menu" />
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <div className="flex h-16 items-center border-b px-6">
              <Link href="/" className="flex items-center gap-2 font-bold">
                <div className="rounded-md bg-primary p-1 text-primary-foreground">
                  UMS
                </div>
                <span>University Management</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <nav className="grid gap-2 p-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent ${
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-accent"
                onClick={() => {
                  setIsSidebarOpen(false);
                  Cookies.remove("token");
                  localStorage.clear();
                  setRole(null);
                }}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 font-bold md:hidden">
          <div className="rounded-md bg-primary p-1 text-primary-foreground">
            UMS
          </div>
        </Link>
        <Link href="/" className="hidden items-center gap-2 font-bold md:flex">
          <div className="rounded-md bg-primary p-1 text-primary-foreground">
            UMS
          </div>
          <span>University Management System</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <div className="font-medium">
            {role ? <span className="capitalize">{role}</span> : "Guest"}
          </div>
          <Link href="/">
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </Link>
        </div>
      </header>
      <div className="flex flex-1 relative">
        <aside className="hidden md:block fixed top-16 bottom-0 w-64 border-r bg-background overflow-y-auto">
          <nav className="grid gap-2 p-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent ${
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
            <Link
              onClick={logout}
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-accent"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Link>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto bg-muted/40 p-4 md:p-6 md:ml-64 min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}

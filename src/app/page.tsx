import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Users, Briefcase, PieChart, BookOpen } from "lucide-react"
import DashboardStats from "@/components/dashboard-stats"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight gradient-text">Skillz Synk</h1>
          <p className="text-muted-foreground">AI-powered resource assignment and training tool</p>
        </div>

        <DashboardStats />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-labrys-lightgray bg-labrys-darkgray card-hover animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-labrys-green">Worker Management</CardTitle>
              <CardDescription>Add and manage worker skills and experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-4 icon-container">
                <Users className="h-12 w-12 text-labrys-green icon animate-float" />
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/workers" className="w-full">
                <Button className="w-full gradient-bg hover:opacity-90 transition-opacity">
                  Manage Workers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card
            className="border-labrys-lightgray bg-labrys-darkgray card-hover animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-labrys-green">Project Management</CardTitle>
              <CardDescription>Create and track projects and requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-4 icon-container">
                <Briefcase className="h-12 w-12 text-labrys-green icon animate-float" />
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/projects" className="w-full">
                <Button className="w-full gradient-bg hover:opacity-90 transition-opacity">
                  Manage Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card
            className="border-labrys-lightgray bg-labrys-darkgray card-hover animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-labrys-green">Resource Assignment</CardTitle>
              <CardDescription>Optimize workforce allocation across projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-4 icon-container">
                <PieChart className="h-12 w-12 text-labrys-green icon animate-float" />
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/assignments" className="w-full">
                <Button className="w-full gradient-bg hover:opacity-90 transition-opacity">
                  Assign Resources
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card
            className="border-labrys-lightgray bg-labrys-darkgray card-hover animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-labrys-green">Skill Gap Analysis</CardTitle>
              <CardDescription>Identify skill gaps and create learning plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-4 icon-container">
                <BookOpen className="h-12 w-12 text-labrys-green icon animate-float" />
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/skill-gaps" className="w-full">
                <Button className="w-full gradient-bg hover:opacity-90 transition-opacity">
                  View Skill Gaps
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}


import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, FileUp, LinkIcon } from "lucide-react"
import ProjectList from "@/components/project-list"

export default function ProjectsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight gradient-text">Project Management</h1>
            <p className="text-muted-foreground">Create and track projects and requirements</p>
          </div>
          <div className="flex gap-2">
            <Link href="/projects/new">
              <Button className="gradient-bg hover:opacity-90 transition-opacity">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </Link>
          </div>
        </div>

        <Card className="border-labrys-lightgray bg-labrys-darkgray card-hover">
          <CardHeader>
            <CardTitle className="text-labrys-green">Import Projects</CardTitle>
            <CardDescription>Add projects by uploading documents or providing URLs</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 sm:flex-row">
            <Button
              variant="outline"
              className="flex-1 border-labrys-lightgray hover:border-labrys-green hover:bg-labrys-lightgray transition-all"
            >
              <FileUp className="mr-2 h-4 w-4 icon" />
              Upload Documents
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-labrys-lightgray hover:border-labrys-green hover:bg-labrys-lightgray transition-all"
            >
              <LinkIcon className="mr-2 h-4 w-4 icon" />
              Import from URL
            </Button>
          </CardContent>
        </Card>

        <ProjectList />
      </div>
    </div>
  )
}


import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, FileUp, LinkIcon } from "lucide-react"
import WorkerList from "@/components/worker-list"

export default function WorkersPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight gradient-text">Worker Management</h1>
            <p className="text-muted-foreground">Add and manage worker skills and experience</p>
          </div>
          <div className="flex gap-2">
            <Link href="/workers/new">
              <Button className="gradient-bg hover:opacity-90 transition-opacity">
                <Plus className="mr-2 h-4 w-4" />
                Add Worker
              </Button>
            </Link>
          </div>
        </div>

        <Card className="border-labrys-lightgray bg-labrys-darkgray card-hover">
          <CardHeader>
            <CardTitle className="text-labrys-green">Import Workers</CardTitle>
            <CardDescription>Add workers by uploading resumes or providing URLs</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 sm:flex-row">
            <Button
              variant="outline"
              className="flex-1 border-labrys-lightgray hover:border-labrys-green hover:bg-labrys-lightgray transition-all"
            >
              <FileUp className="mr-2 h-4 w-4 icon" />
              Upload Resumes
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

        <WorkerList />
      </div>
    </div>
  )
}


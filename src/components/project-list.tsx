"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Users } from "lucide-react"
import Link from "next/link"

type Project = {
  id: string
  name: string
  status: "New" | "Current" | "Completed"
  startDate?: string
  endDate?: string
  requiredSkills: string[]
  assignedWorkers: number
}

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from the API
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      setProjects([
        {
          id: "1",
          name: "E-commerce Platform Redesign",
          status: "Current",
          startDate: "2023-10-15",
          endDate: "2024-03-30",
          requiredSkills: ["React", "Node.js", "UI/UX"],
          assignedWorkers: 5,
        },
        {
          id: "2",
          name: "Mobile App Development",
          status: "New",
          requiredSkills: ["React Native", "Firebase", "Swift"],
          assignedWorkers: 0,
        },
        {
          id: "3",
          name: "Data Warehouse Migration",
          status: "Current",
          startDate: "2023-11-01",
          endDate: "2024-02-28",
          requiredSkills: ["SQL", "AWS", "ETL"],
          assignedWorkers: 3,
        },
        {
          id: "4",
          name: "Internal Dashboard",
          status: "Completed",
          startDate: "2023-06-10",
          endDate: "2023-09-30",
          requiredSkills: ["React", "TypeScript", "GraphQL"],
          assignedWorkers: 4,
        },
        {
          id: "5",
          name: "AI Chatbot Integration",
          status: "New",
          requiredSkills: ["Python", "Machine Learning", "NLP"],
          assignedWorkers: 0,
        },
      ])
      setLoading(false)
    }, 800)
  }, [])

  if (loading) {
    return <div className="flex justify-center p-8 animate-pulse-green text-labrys-green">Loading projects...</div>
  }

  return (
    <div className="rounded-md border border-labrys-lightgray bg-labrys-darkgray overflow-hidden animate-fade-in">
      <Table>
        <TableHeader className="bg-labrys-black">
          <TableRow>
            <TableHead>Project Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Timeline</TableHead>
            <TableHead>Required Skills</TableHead>
            <TableHead>Team</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project, index) => (
            <TableRow
              key={project.id}
              className="hover:bg-labrys-black/50 transition-colors animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    project.status === "New" ? "outline" : project.status === "Current" ? "default" : "secondary"
                  }
                  className={
                    project.status === "New"
                      ? "border-labrys-yellow text-labrys-yellow"
                      : project.status === "Current"
                        ? "bg-labrys-green text-black"
                        : "bg-labrys-lightgray"
                  }
                >
                  {project.status}
                </Badge>
              </TableCell>
              <TableCell>
                {project.startDate ? (
                  <>
                    {new Date(project.startDate).toLocaleDateString()} -{" "}
                    {project.endDate ? new Date(project.endDate).toLocaleDateString() : "Ongoing"}
                  </>
                ) : (
                  "Not started"
                )}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {project.requiredSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="border-labrys-lightgray hover:border-labrys-green hover:bg-labrys-green hover:text-black transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-labrys-green" />
                  {project.assignedWorkers}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/projects/${project.id}`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:text-labrys-green hover:bg-labrys-lightgray transition-colors"
                    >
                      <Edit className="h-4 w-4 icon" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:text-labrys-green hover:bg-labrys-lightgray transition-colors"
                  >
                    <Trash2 className="h-4 w-4 icon" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


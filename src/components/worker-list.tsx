"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import Link from "next/link"

type Worker = {
  id: string
  name: string
  title: string
  department: string
  skills: string[]
  projects: number
}

export default function WorkerList() {
  const [workers, setWorkers] = useState<Worker[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from the API
    // For demo purposes, we'll use mock data
    setWorkers([
      {
        id: "1",
        name: "Alex Johnson",
        title: "Senior Developer",
        department: "Engineering",
        skills: ["React", "TypeScript", "Node.js"],
        projects: 3,
      },
      {
        id: "2",
        name: "Sarah Williams",
        title: "UX Designer",
        department: "Design",
        skills: ["Figma", "UI/UX", "User Research"],
        projects: 2,
      },
      {
        id: "3",
        name: "Michael Chen",
        title: "Project Manager",
        department: "Product",
        skills: ["Agile", "Scrum", "JIRA"],
        projects: 4,
      },
      {
        id: "4",
        name: "Emily Rodriguez",
        title: "Data Scientist",
        department: "Data",
        skills: ["Python", "Machine Learning", "SQL"],
        projects: 1,
      },
      {
        id: "5",
        name: "David Kim",
        title: "DevOps Engineer",
        department: "Infrastructure",
        skills: ["AWS", "Docker", "Kubernetes"],
        projects: 2,
      },
    ])
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="flex justify-center p-8">Loading workers...</div>
  }

  return (
    <div className="rounded-md border border-labrys-lightgray bg-labrys-darkgray overflow-hidden animate-fade-in">
      <Table>
        <TableHeader className="bg-labrys-black">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Skills</TableHead>
            <TableHead>Projects</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workers.map((worker, index) => (
            <TableRow
              key={worker.id}
              className="hover:bg-labrys-black/50 transition-colors animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <TableCell className="font-medium">{worker.name}</TableCell>
              <TableCell>{worker.title}</TableCell>
              <TableCell>{worker.department}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {worker.skills.map((skill) => (
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
              <TableCell>{worker.projects}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/workers/${worker.id}`}>
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


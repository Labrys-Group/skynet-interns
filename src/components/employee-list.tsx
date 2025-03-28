"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import Link from "next/link"

type Employee = {
  id: string
  name: string
  title: string
  department: string
  skills: string[]
  projects: number
}

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from the API
    // For demo purposes, we'll use mock data
    setEmployees([
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
    return <div className="flex justify-center p-8">Loading employees...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
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
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">{employee.name}</TableCell>
              <TableCell>{employee.title}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {employee.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{employee.projects}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/employees/${employee.id}`}>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
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


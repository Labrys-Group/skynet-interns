"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

type SkillGap = {
  id: string
  skill: string
  requiredBy: string[]
  currentCoverage: number
  priority: "High" | "Medium" | "Low"
  suggestedWorkers: string[]
}

export default function SkillGapList() {
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from the API
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      setSkillGaps([
        {
          id: "1",
          skill: "React Native",
          requiredBy: ["Mobile App Development"],
          currentCoverage: 30,
          priority: "High",
          suggestedWorkers: ["Alex Johnson", "Ryan Patel"],
        },
        {
          id: "2",
          skill: "Machine Learning",
          requiredBy: ["AI Chatbot Integration"],
          currentCoverage: 20,
          priority: "High",
          suggestedWorkers: ["Emily Rodriguez"],
        },
        {
          id: "3",
          skill: "Swift",
          requiredBy: ["Mobile App Development"],
          currentCoverage: 10,
          priority: "Medium",
          suggestedWorkers: ["Sophia Garcia", "Ryan Patel"],
        },
        {
          id: "4",
          skill: "NLP",
          requiredBy: ["AI Chatbot Integration"],
          currentCoverage: 15,
          priority: "Medium",
          suggestedWorkers: ["Emily Rodriguez", "David Kim"],
        },
        {
          id: "5",
          skill: "GraphQL",
          requiredBy: ["E-commerce Platform Redesign"],
          currentCoverage: 40,
          priority: "Low",
          suggestedWorkers: ["Alex Johnson", "Michael Chen"],
        },
      ])
      setLoading(false)
    }, 800)
  }, [])

  if (loading) {
    return <div className="flex justify-center p-8 animate-pulse-green text-labrys-green">Loading skill gaps...</div>
  }

  return (
    <div className="rounded-md border border-labrys-lightgray animate-fade-in">
      <Table>
        <TableHeader className="bg-labrys-black">
          <TableRow>
            <TableHead>Skill</TableHead>
            <TableHead>Required By</TableHead>
            <TableHead>Current Coverage</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Suggested Workers</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skillGaps.map((gap, index) => (
            <TableRow
              key={gap.id}
              className="hover:bg-labrys-black/50 transition-colors animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <TableCell className="font-medium">{gap.skill}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {gap.requiredBy.map((project) => (
                    <Badge
                      key={project}
                      variant="outline"
                      className="border-labrys-lightgray hover:border-labrys-green hover:bg-labrys-green hover:text-black transition-colors"
                    >
                      {project}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-24 rounded-full bg-labrys-lightgray">
                    <div
                      className={`h-2 rounded-full ${
                        gap.currentCoverage < 30
                          ? "bg-red-500"
                          : gap.currentCoverage < 60
                            ? "bg-labrys-yellow"
                            : "bg-labrys-green"
                      }`}
                      style={{ width: `${gap.currentCoverage}%` }}
                    />
                  </div>
                  <span className="text-xs">{gap.currentCoverage}%</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    gap.priority === "High" ? "destructive" : gap.priority === "Medium" ? "default" : "secondary"
                  }
                  className={
                    gap.priority === "High"
                      ? "bg-red-500"
                      : gap.priority === "Medium"
                        ? "bg-labrys-yellow text-black"
                        : "bg-labrys-lightgray"
                  }
                >
                  {gap.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {gap.suggestedWorkers.map((worker) => (
                    <Badge
                      key={worker}
                      variant="outline"
                      className="border-labrys-lightgray hover:border-labrys-green hover:bg-labrys-green hover:text-black transition-colors"
                    >
                      {worker}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" className="gradient-bg hover:opacity-90 transition-opacity">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Create Plan
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

type Project = {
  id: string
  name: string
  requiredSkills: string[]
}

type Worker = {
  id: string
  name: string
  title: string
  skills: string[]
  availability: string
  matchScore: number
  avatar?: string
}

type Props = {
  projectStatus: "New" | "Current" | "All"
}

export default function AssignmentSuggestions({ projectStatus }: Props) {
  const [selectedProject, setSelectedProject] = useState<string>("")
  const [projects, setProjects] = useState<Project[]>([])
  const [suggestions, setSuggestions] = useState<{
    bestFit: Worker[]
    availableFit: Worker[]
  }>({
    bestFit: [],
    availableFit: [],
  })
  const [loading, setLoading] = useState(true)
  const [suggestionsLoading, setSuggestionsLoading] = useState(false)

  useEffect(() => {
    // In a real app, this would fetch from the API
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      setProjects([
        {
          id: "2",
          name: "Mobile App Development",
          requiredSkills: ["React Native", "Firebase", "Swift"],
        },
        {
          id: "5",
          name: "AI Chatbot Integration",
          requiredSkills: ["Python", "Machine Learning", "NLP"],
        },
      ])
      setLoading(false)
    }, 800)
  }, [projectStatus])

  useEffect(() => {
    if (!selectedProject) return

    setSuggestionsLoading(true)
    // In a real app, this would fetch from the API based on the selected project
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      setSuggestions({
        bestFit: [
          {
            id: "1",
            name: "Alex Johnson",
            title: "Senior Developer",
            skills: ["React", "React Native", "TypeScript", "Firebase"],
            availability: "Available in 2 weeks",
            matchScore: 92,
          },
          {
            id: "6",
            name: "Jessica Lee",
            title: "Mobile Developer",
            skills: ["React Native", "Swift", "Kotlin"],
            availability: "Currently assigned",
            matchScore: 88,
          },
          {
            id: "7",
            name: "Ryan Patel",
            title: "Frontend Developer",
            skills: ["React", "React Native", "JavaScript"],
            availability: "Available now",
            matchScore: 75,
          },
        ],
        availableFit: [
          {
            id: "7",
            name: "Ryan Patel",
            title: "Frontend Developer",
            skills: ["React", "React Native", "JavaScript"],
            availability: "Available now",
            matchScore: 75,
          },
          {
            id: "8",
            name: "Sophia Garcia",
            title: "Junior Developer",
            skills: ["React", "JavaScript", "HTML/CSS"],
            availability: "Available now",
            matchScore: 60,
          },
          {
            id: "9",
            name: "James Wilson",
            title: "Backend Developer",
            skills: ["Node.js", "Firebase", "MongoDB"],
            availability: "Available now",
            matchScore: 55,
          },
        ],
      })
      setSuggestionsLoading(false)
    }, 1000)
  }, [selectedProject])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="project-select" className="text-sm font-medium">
          Select Project
        </label>
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger
            id="project-select"
            className="bg-labrys-black border-labrys-lightgray focus:border-labrys-green"
          >
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent className="bg-labrys-black border-labrys-lightgray">
            {loading ? (
              <div className="p-2 text-center animate-pulse-green text-labrys-green">Loading projects...</div>
            ) : (
              projects.map((project) => (
                <SelectItem
                  key={project.id}
                  value={project.id}
                  className="hover:bg-labrys-lightgray focus:bg-labrys-lightgray"
                >
                  {project.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      {selectedProject && (
        <Tabs defaultValue="best-fit" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-labrys-lightgray">
            <TabsTrigger
              value="best-fit"
              className="data-[state=active]:bg-labrys-green data-[state=active]:text-black"
            >
              Best Fit
            </TabsTrigger>
            <TabsTrigger
              value="available-fit"
              className="data-[state=active]:bg-labrys-green data-[state=active]:text-black"
            >
              Available Fit
            </TabsTrigger>
          </TabsList>
          <TabsContent value="best-fit" className="pt-4 animate-fade-in">
            <Card className="border-labrys-lightgray bg-labrys-darkgray">
              <CardHeader>
                <CardTitle className="text-labrys-green">Best Fit Workers</CardTitle>
                <CardDescription>Ideal workers based on skills (even if assigned elsewhere)</CardDescription>
              </CardHeader>
              <CardContent>
                {suggestionsLoading ? (
                  <div className="flex justify-center p-8 animate-pulse-green text-labrys-green">
                    Finding best matches...
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {suggestions.bestFit.map((worker, index) => (
                      <div
                        key={worker.id}
                        className="flex items-center justify-between rounded-lg border border-labrys-lightgray p-4 hover:border-labrys-green transition-colors animate-slide-up bg-labrys-black/50"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="border border-labrys-lightgray">
                            <AvatarFallback className="bg-labrys-lightgray text-white">
                              {worker.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{worker.name}</div>
                            <div className="text-sm text-muted-foreground">{worker.title}</div>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {worker.skills.map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="outline"
                                  className="text-xs border-labrys-lightgray hover:border-labrys-green hover:bg-labrys-green hover:text-black transition-colors"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">Match:</span>
                            <Badge
                              variant={worker.matchScore > 80 ? "default" : "secondary"}
                              className={worker.matchScore > 80 ? "bg-labrys-green text-black" : "bg-labrys-lightgray"}
                            >
                              {worker.matchScore}%
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">{worker.availability}</div>
                          <Button size="sm" className="mt-1 gradient-bg hover:opacity-90 transition-opacity">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Assign
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="available-fit" className="pt-4 animate-fade-in">
            <Card className="border-labrys-lightgray bg-labrys-darkgray">
              <CardHeader>
                <CardTitle className="text-labrys-green">Available Workers</CardTitle>
                <CardDescription>Workers available based on project start date</CardDescription>
              </CardHeader>
              <CardContent>
                {suggestionsLoading ? (
                  <div className="flex justify-center p-8 animate-pulse-green text-labrys-green">
                    Finding available workers...
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {suggestions.availableFit.map((worker, index) => (
                      <div
                        key={worker.id}
                        className="flex items-center justify-between rounded-lg border border-labrys-lightgray p-4 hover:border-labrys-green transition-colors animate-slide-up bg-labrys-black/50"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="border border-labrys-lightgray">
                            <AvatarFallback className="bg-labrys-lightgray text-white">
                              {worker.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{worker.name}</div>
                            <div className="text-sm text-muted-foreground">{worker.title}</div>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {worker.skills.map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="outline"
                                  className="text-xs border-labrys-lightgray hover:border-labrys-green hover:bg-labrys-green hover:text-black transition-colors"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">Match:</span>
                            <Badge
                              variant={worker.matchScore > 80 ? "default" : "secondary"}
                              className={worker.matchScore > 80 ? "bg-labrys-green text-black" : "bg-labrys-lightgray"}
                            >
                              {worker.matchScore}%
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">{worker.availability}</div>
                          <Button size="sm" className="mt-1 gradient-bg hover:opacity-90 transition-opacity">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Assign
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}


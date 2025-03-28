"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Clock, Calendar, Download, Star, X } from "lucide-react"

type LearningResource = {
  id: string
  title: string
  type: "Course" | "Book" | "Tutorial" | "Article"
  provider: string
  duration: string
  rating: number
  url: string
}

type LearningPlan = {
  skill: string
  worker: string
  estimatedCompletion: string
  startDate: string
  resources: LearningResource[]
}

const SKILLS = ["React Native", "Machine Learning", "Swift", "NLP", "GraphQL"]
const WORKERS = ["Alex Johnson", "Emily Rodriguez", "Ryan Patel", "Sophia Garcia", "David Kim"]

export default function LearningPlanView() {
  const [selectedSkill, setSelectedSkill] = useState<string>("")
  const [selectedWorker, setSelectedWorker] = useState<string>("")
  const [plan, setPlan] = useState<LearningPlan | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGeneratePlan = () => {
    if (!selectedSkill || !selectedWorker) return

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      // Mock data for the learning plan
      setPlan({
        skill: selectedSkill,
        worker: selectedWorker,
        estimatedCompletion: "4 weeks",
        startDate: new Date().toLocaleDateString(),
        resources: [
          {
            id: "1",
            title:
              selectedSkill === "React Native"
                ? "React Native - The Practical Guide"
                : selectedSkill === "Machine Learning"
                  ? "Machine Learning A-Z™: Hands-On Python & R"
                  : "Complete Guide to " + selectedSkill,
            type: "Course",
            provider: "Udemy",
            duration: "20 hours",
            rating: 4.8,
            url: "#",
          },
          {
            id: "2",
            title:
              selectedSkill === "React Native"
                ? "React Native in Action"
                : selectedSkill === "Machine Learning"
                  ? "Hands-On Machine Learning with Scikit-Learn & TensorFlow"
                  : selectedSkill + " Fundamentals",
            type: "Book",
            provider: "Manning Publications",
            duration: "10 hours",
            rating: 4.6,
            url: "#",
          },
          {
            id: "3",
            title:
              selectedSkill === "React Native"
                ? "Building a React Native App from Scratch"
                : selectedSkill === "Machine Learning"
                  ? "Introduction to Machine Learning Algorithms"
                  : "Getting Started with " + selectedSkill,
            type: "Tutorial",
            provider: "Medium",
            duration: "2 hours",
            rating: 4.5,
            url: "#",
          },
        ],
      })
      setLoading(false)
    }, 1500)
  }

  const handleClear = () => {
    setSelectedSkill("")
    setSelectedWorker("")
    setPlan(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="skill-select" className="text-sm font-medium">
            Select Skill
          </label>
          <Select value={selectedSkill} onValueChange={setSelectedSkill}>
            <SelectTrigger
              id="skill-select"
              className="bg-labrys-black border-labrys-lightgray focus:border-labrys-green"
            >
              <SelectValue placeholder="Select a skill" />
            </SelectTrigger>
            <SelectContent className="bg-labrys-black border-labrys-lightgray">
              {SKILLS.map((skill) => (
                <SelectItem key={skill} value={skill} className="hover:bg-labrys-lightgray focus:bg-labrys-lightgray">
                  {skill}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="worker-select" className="text-sm font-medium">
            Select Worker
          </label>
          <Select value={selectedWorker} onValueChange={setSelectedWorker}>
            <SelectTrigger
              id="worker-select"
              className="bg-labrys-black border-labrys-lightgray focus:border-labrys-green"
            >
              <SelectValue placeholder="Select a worker" />
            </SelectTrigger>
            <SelectContent className="bg-labrys-black border-labrys-lightgray">
              {WORKERS.map((worker) => (
                <SelectItem key={worker} value={worker} className="hover:bg-labrys-lightgray focus:bg-labrys-lightgray">
                  {worker}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        {(selectedSkill || selectedWorker) && (
          <Button
            onClick={handleClear}
            variant="outline"
            className="border-labrys-lightgray hover:border-labrys-green hover:bg-labrys-lightgray"
          >
            <X className="mr-2 h-4 w-4" />
            Clear
          </Button>
        )}
        <Button
          onClick={handleGeneratePlan}
          disabled={!selectedSkill || !selectedWorker || loading}
          className="gradient-bg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Learning Plan"}
        </Button>
      </div>

      {plan && (
        <Card className="border-labrys-lightgray bg-labrys-darkgray animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-labrys-green">Learning Plan for {plan.skill}</CardTitle>
                <CardDescription>Personalized for {plan.worker}</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-labrys-lightgray hover:border-labrys-green hover:bg-labrys-lightgray transition-all"
              >
                <Download className="mr-2 h-4 w-4 icon" />
                Export Plan
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-labrys-green" />
                <span className="text-sm">
                  Estimated completion: <strong>{plan.estimatedCompletion}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-labrys-green" />
                <span className="text-sm">
                  Start date: <strong>{plan.startDate}</strong>
                </span>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-labrys-lightgray">
                <TabsTrigger value="all" className="data-[state=active]:bg-labrys-green data-[state=active]:text-black">
                  All Resources
                </TabsTrigger>
                <TabsTrigger
                  value="courses"
                  className="data-[state=active]:bg-labrys-green data-[state=active]:text-black"
                >
                  Courses
                </TabsTrigger>
                <TabsTrigger
                  value="books"
                  className="data-[state=active]:bg-labrys-green data-[state=active]:text-black"
                >
                  Books
                </TabsTrigger>
                <TabsTrigger
                  value="tutorials"
                  className="data-[state=active]:bg-labrys-green data-[state=active]:text-black"
                >
                  Tutorials
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="pt-4 animate-fade-in">
                <div className="flex flex-col gap-4">
                  {plan.resources.map((resource, index) => (
                    <Card
                      key={resource.id}
                      className="border-labrys-lightgray bg-labrys-black card-hover animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base text-white">{resource.title}</CardTitle>
                            <CardDescription>{resource.provider}</CardDescription>
                          </div>
                          <Badge className="bg-labrys-green text-black">{resource.type}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-labrys-green" />
                            <span className="text-sm">{resource.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-labrys-yellow" />
                            <span className="text-sm">{resource.rating}/5.0</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-labrys-lightgray hover:border-labrys-green hover:bg-labrys-lightgray transition-all"
                        >
                          <ExternalLink className="mr-2 h-4 w-4 icon" />
                          View Resource
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="courses" className="pt-4 animate-fade-in">
                <div className="flex flex-col gap-4">
                  {plan.resources
                    .filter((resource) => resource.type === "Course")
                    .map((resource) => (
                      <Card key={resource.id} className="border-labrys-lightgray bg-labrys-black card-hover">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-base text-white">{resource.title}</CardTitle>
                              <CardDescription>{resource.provider}</CardDescription>
                            </div>
                            <Badge className="bg-labrys-green text-black">{resource.type}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-labrys-green" />
                              <span className="text-sm">{resource.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-labrys-yellow" />
                              <span className="text-sm">{resource.rating}/5.0</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-labrys-lightgray hover:border-labrys-green hover:bg-labrys-lightgray transition-all"
                          >
                            <ExternalLink className="mr-2 h-4 w-4 icon" />
                            View Resource
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="books" className="pt-4 animate-fade-in">
                <div className="flex flex-col gap-4">
                  {plan.resources
                    .filter((resource) => resource.type === "Book")
                    .map((resource) => (
                      <Card key={resource.id} className="border-labrys-lightgray bg-labrys-black card-hover">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-base text-white">{resource.title}</CardTitle>
                              <CardDescription>{resource.provider}</CardDescription>
                            </div>
                            <Badge className="bg-labrys-green text-black">{resource.type}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-labrys-green" />
                              <span className="text-sm">{resource.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-labrys-yellow" />
                              <span className="text-sm">{resource.rating}/5.0</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-labrys-lightgray hover:border-labrys-green hover:bg-labrys-lightgray transition-all"
                          >
                            <ExternalLink className="mr-2 h-4 w-4 icon" />
                            View Resource
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="tutorials" className="pt-4 animate-fade-in">
                <div className="flex flex-col gap-4">
                  {plan.resources
                    .filter((resource) => resource.type === "Tutorial")
                    .map((resource) => (
                      <Card key={resource.id} className="border-labrys-lightgray bg-labrys-black card-hover">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-base text-white">{resource.title}</CardTitle>
                              <CardDescription>{resource.provider}</CardDescription>
                            </div>
                            <Badge className="bg-labrys-green text-black">{resource.type}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-labrys-green" />
                              <span className="text-sm">{resource.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-labrys-yellow" />
                              <span className="text-sm">{resource.rating}/5.0</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-labrys-lightgray hover:border-labrys-green hover:bg-labrys-lightgray transition-all"
                          >
                            <ExternalLink className="mr-2 h-4 w-4 icon" />
                            View Resource
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


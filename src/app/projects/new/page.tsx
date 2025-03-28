"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { X, FileUp, LinkIcon, Plus } from "lucide-react"
import { extractSkillsFromProjectBrief } from "@/lib/api-utils"

export default function NewProjectPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [status, setStatus] = useState<"New" | "Current" | "Completed">("New")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [brief, setBrief] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [loading, setLoading] = useState(false)

  const handleExtractSkills = async () => {
    if (!brief) return

    setLoading(true)
    try {
      const extractedSkills = await extractSkillsFromProjectBrief(brief)
      setSkills(extractedSkills)
    } catch (error) {
      console.error("Error extracting skills:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to the API
    console.log({ name, status, startDate, endDate, skills })
    router.push("/projects")
  }

  const handleCancel = () => {
    router.push("/projects")
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight gradient-text">Create New Project</h1>
          <p className="text-muted-foreground">Add a new project with requirements and skills needed</p>
        </div>

        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-labrys-lightgray">
            <TabsTrigger value="manual" className="data-[state=active]:bg-labrys-green data-[state=active]:text-black">
              Manual Entry
            </TabsTrigger>
            <TabsTrigger
              value="document"
              className="data-[state=active]:bg-labrys-green data-[state=active]:text-black"
            >
              Document Upload
            </TabsTrigger>
            <TabsTrigger value="url" className="data-[state=active]:bg-labrys-green data-[state=active]:text-black">
              Import from URL
            </TabsTrigger>
          </TabsList>
          <TabsContent value="manual" className="pt-4 animate-fade-in">
            <form onSubmit={handleSubmit}>
              <Card className="border-labrys-lightgray bg-labrys-darkgray card-hover">
                <CardHeader>
                  <CardTitle className="text-labrys-green">Project Information</CardTitle>
                  <CardDescription>Enter the project details and required skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Project Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="E-commerce Platform Redesign"
                      required
                      className="bg-labrys-black border-labrys-lightgray focus:border-labrys-green"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="status">Project Status</Label>
                      <Select
                        value={status}
                        onValueChange={(value: "New" | "Current" | "Completed") => setStatus(value)}
                      >
                        <SelectTrigger
                          id="status"
                          className="bg-labrys-black border-labrys-lightgray focus:border-labrys-green"
                        >
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-labrys-black border-labrys-lightgray">
                          <SelectItem value="New" className="hover:bg-labrys-lightgray focus:bg-labrys-lightgray">
                            New Project
                          </SelectItem>
                          <SelectItem value="Current" className="hover:bg-labrys-lightgray focus:bg-labrys-lightgray">
                            Current Project
                          </SelectItem>
                          <SelectItem value="Completed" className="hover:bg-labrys-lightgray focus:bg-labrys-lightgray">
                            Completed Project
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <div className="flex">
                        <Input
                          id="start-date"
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          disabled={status === "New"}
                          className="bg-labrys-black border-labrys-lightgray focus:border-labrys-green disabled:opacity-50"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <div className="flex">
                        <Input
                          id="end-date"
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          disabled={status === "New"}
                          min={startDate}
                          className="bg-labrys-black border-labrys-lightgray focus:border-labrys-green disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="brief">Project Brief</Label>
                    <Textarea
                      id="brief"
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      placeholder="Describe the project requirements and goals..."
                      rows={5}
                      className="bg-labrys-black border-labrys-lightgray focus:border-labrys-green"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <Label>Required Skills</Label>
                      {brief && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleExtractSkills}
                          disabled={loading}
                          className="border-labrys-lightgray hover:border-labrys-green hover:bg-labrys-lightgray disabled:opacity-50"
                        >
                          {loading ? "Extracting..." : "Extract from Brief"}
                        </Button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="flex items-center gap-1 bg-labrys-lightgray hover:bg-labrys-green hover:text-black transition-colors"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-1 rounded-full hover:bg-black/20 p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a required skill"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddSkill()
                          }
                        }}
                        className="bg-labrys-black border-labrys-lightgray focus:border-labrys-green"
                      />
                      <Button
                        type="button"
                        onClick={handleAddSkill}
                        variant="outline"
                        className="border-labrys-lightgray hover:border-labrys-green hover:bg-labrys-lightgray"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      className="border-labrys-lightgray hover:border-labrys-green hover:bg-labrys-lightgray"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="gradient-bg hover:opacity-90 transition-opacity">
                      Save Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </TabsContent>
          <TabsContent value="document" className="pt-4 animate-fade-in">
            <Card className="border-labrys-lightgray bg-labrys-darkgray card-hover">
              <CardHeader>
                <CardTitle className="text-labrys-green">Upload Project Document</CardTitle>
                <CardDescription>
                  Upload a project brief or requirements document to automatically extract details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-labrys-lightgray p-12 transition-all hover:border-labrys-green">
                  <div className="icon-container">
                    <FileUp className="h-8 w-8 text-muted-foreground mb-4 icon" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Drag and drop your document here or click to browse</p>
                    <p className="text-xs text-muted-foreground mt-1">Supports PDF, DOCX, and TXT files up to 10MB</p>
                  </div>
                  <Button
                    variant="outline"
                    className="mt-4 border-labrys-lightgray hover:border-labrys-green hover:bg-labrys-lightgray"
                  >
                    Browse Files
                  </Button>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="border-labrys-lightgray hover:border-labrys-green hover:bg-labrys-lightgray"
                  >
                    Cancel
                  </Button>
                  <Button disabled className="gradient-bg opacity-50">
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="url" className="pt-4 animate-fade-in">
            <Card className="border-labrys-lightgray bg-labrys-darkgray card-hover">
              <CardHeader>
                <CardTitle className="text-labrys-green">Import from URL</CardTitle>
                <CardDescription>Provide a URL to a project brief or requirements document</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="project-url">Document URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="project-url"
                      placeholder="https://example.com/project-brief.pdf"
                      className="bg-labrys-black border-labrys-lightgray focus:border-labrys-green"
                    />
                    <Button
                      variant="outline"
                      className="border-labrys-lightgray hover:border-labrys-green hover:bg-labrys-lightgray"
                    >
                      <LinkIcon className="mr-2 h-4 w-4 icon" />
                      Fetch
                    </Button>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="border-labrys-lightgray hover:border-labrys-green hover:bg-labrys-lightgray"
                  >
                    Cancel
                  </Button>
                  <Button disabled className="gradient-bg opacity-50">
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import ResourceAllocationChart from "@/components/resource-allocation-chart"

export default function DashboardStats() {
  const [stats, setStats] = useState({
    workers: 0,
    projects: 0,
    activeProjects: 0,
    skillGaps: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setStats({
        workers: 42,
        projects: 15,
        activeProjects: 8,
        skillGaps: 12,
      })
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className={`border-labrys-lightgray bg-labrys-darkgray card-hover transition-all duration-300 ${loading ? "opacity-50" : "opacity-100"}`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-labrys-green">Total Workers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.workers}</div>
            <p className="text-xs text-muted-foreground">Across all departments</p>
          </CardContent>
        </Card>
        <Card
          className={`border-labrys-lightgray bg-labrys-darkgray card-hover transition-all duration-300 ${loading ? "opacity-50" : "opacity-100"}`}
          style={{ transitionDelay: "0.1s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-labrys-green">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.projects}</div>
            <p className="text-xs text-muted-foreground">All project statuses</p>
          </CardContent>
        </Card>
        <Card
          className={`border-labrys-lightgray bg-labrys-darkgray card-hover transition-all duration-300 ${loading ? "opacity-50" : "opacity-100"}`}
          style={{ transitionDelay: "0.2s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-labrys-green">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.activeProjects}</div>
            <p className="text-xs text-muted-foreground">Currently in progress</p>
          </CardContent>
        </Card>
        <Card
          className={`border-labrys-lightgray bg-labrys-darkgray card-hover transition-all duration-300 ${loading ? "opacity-50" : "opacity-100"}`}
          style={{ transitionDelay: "0.3s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-labrys-green">Skill Gaps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.skillGaps}</div>
            <p className="text-xs text-muted-foreground">Requiring training plans</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-labrys-lightgray bg-labrys-darkgray">
        <CardHeader>
          <CardTitle className="text-labrys-green">Resource Allocation Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResourceAllocationChart />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


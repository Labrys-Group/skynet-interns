"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts"
import { Card } from "@/components/ui/card"

type AllocationData = {
  date: string
  current: number
  projected: number
  optimal: number
}

export default function ResourceAllocationChart() {
  const [data, setData] = useState<AllocationData[]>([])
  const [loading, setLoading] = useState(true)
  const [animationActive, setAnimationActive] = useState(true)

  useEffect(() => {
    // Generate mock data for the chart
    const generateData = () => {
      const currentDate = new Date()
      const data: AllocationData[] = []

      // Generate data for the past 3 months
      for (let i = -90; i <= 180; i += 15) {
        const date = new Date(currentDate)
        date.setDate(date.getDate() + i)

        // Current allocation (past and present)
        const current = i <= 0 ? 65 + Math.sin(i / 20) * 15 + Math.random() * 5 : null

        // Projected allocation (future)
        const projected = i > 0 ? 70 + Math.sin(i / 25) * 20 : null

        // Optimal allocation level
        const optimal = 85

        data.push({
          date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          current: current,
          projected: projected,
          optimal: optimal,
        })
      }

      return data
    }

    // Simulate loading data
    setTimeout(() => {
      setData(generateData())
      setLoading(false)

      // Disable animation after initial render
      setTimeout(() => {
        setAnimationActive(false)
      }, 2000)
    }, 1000)
  }, [])

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <Card className="bg-labrys-black border-labrys-lightgray p-3">
          <p className="text-sm font-medium text-labrys-green">{label}</p>
          {payload.map(
            (entry, index) =>
              entry.value !== null && (
                <p key={index} className="text-xs" style={{ color: entry.color }}>
                  {entry.name}: {entry.value.toFixed(0)}%
                </p>
              ),
          )}
        </Card>
      )
    }
    return null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse-green text-labrys-green">Loading resource allocation data...</div>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
        <XAxis dataKey="date" stroke="#666" tick={{ fill: "#999" }} />
        <YAxis stroke="#666" tick={{ fill: "#999" }} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ paddingTop: "10px" }} />
        <Line
          type="monotone"
          dataKey="current"
          name="Current Allocation"
          stroke="#00E676"
          strokeWidth={2}
          dot={{ r: 3, fill: "#00E676" }}
          activeDot={{ r: 5, stroke: "#00E676", strokeWidth: 2 }}
          isAnimationActive={animationActive}
        />
        <Line
          type="monotone"
          dataKey="projected"
          name="Projected Allocation"
          stroke="#D6E600"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ r: 3, fill: "#D6E600" }}
          activeDot={{ r: 5, stroke: "#D6E600", strokeWidth: 2 }}
          isAnimationActive={animationActive}
        />
        <Line
          type="monotone"
          dataKey="optimal"
          name="Optimal Allocation"
          stroke="#666"
          strokeWidth={1}
          strokeDasharray="3 3"
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}


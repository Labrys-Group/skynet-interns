"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Download } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function ResourceOptimization() {
  const [loading, setLoading] = useState(false)
  const [optimized, setOptimized] = useState(false)

  const handleOptimize = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setOptimized(true)
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="border-labrys-lightgray bg-labrys-darkgray">
        <CardHeader>
          <CardTitle className="text-labrys-green">Optimized Resource Plan</CardTitle>
          <CardDescription>AI-generated workforce allocation across all projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end gap-2 mb-4">
            <Button
              variant="outline"
              onClick={handleOptimize}
              disabled={loading}
              className="border-labrys-lightgray hover:border-labrys-green hover:bg-labrys-lightgray transition-all disabled:opacity-50"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Optimizing..." : "Generate Optimization"}
            </Button>
            {optimized && (
              <Button
                variant="outline"
                className="border-labrys-lightgray hover:border-labrys-green hover:bg-labrys-lightgray transition-all"
              >
                <Download className="mr-2 h-4 w-4" />
                Export Plan
              </Button>
            )}
          </div>

          {optimized ? (
            <div className="rounded-md border border-labrys-lightgray animate-fade-in">
              <Table>
                <TableHeader className="bg-labrys-black">
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Assigned Team</TableHead>
                    <TableHead>Skill Coverage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-labrys-black/50 transition-colors animate-slide-up">
                    <TableCell className="font-medium">E-commerce Platform Redesign</TableCell>
                    <TableCell>
                      <Badge className="bg-labrys-green text-black">Current</Badge>
                    </TableCell>
                    <TableCell>Oct 15, 2023 - Mar 30, 2024</TableCell>
                    <TableCell>Alex J., Sarah W., Michael C.</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-labrys-green/10 border-labrys-green text-labrys-green">
                        98%
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    className="hover:bg-labrys-black/50 transition-colors animate-slide-up"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <TableCell className="font-medium">Mobile App Development</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-labrys-yellow text-labrys-yellow">
                        New
                      </Badge>
                    </TableCell>
                    <TableCell>Apr 1, 2024 - Aug 30, 2024</TableCell>
                    <TableCell>Ryan P., Sophia G., James W.</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-labrys-green/10 border-labrys-green text-labrys-green">
                        85%
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    className="hover:bg-labrys-black/50 transition-colors animate-slide-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <TableCell className="font-medium">Data Warehouse Migration</TableCell>
                    <TableCell>
                      <Badge className="bg-labrys-green text-black">Current</Badge>
                    </TableCell>
                    <TableCell>Nov 1, 2023 - Feb 28, 2024</TableCell>
                    <TableCell>Emily R., David K.</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-labrys-green/10 border-labrys-green text-labrys-green">
                        92%
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    className="hover:bg-labrys-black/50 transition-colors animate-slide-up"
                    style={{ animationDelay: "0.3s" }}
                  >
                    <TableCell className="font-medium">AI Chatbot Integration</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-labrys-yellow text-labrys-yellow">
                        New
                      </Badge>
                    </TableCell>
                    <TableCell>Mar 15, 2024 - Jun 30, 2024</TableCell>
                    <TableCell>Emily R., Alex J.</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-labrys-yellow/10 border-labrys-yellow text-labrys-yellow">
                        78%
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">
                Click "Generate Optimization" to create an AI-powered resource allocation plan across all projects.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                The AI will analyze skills, availability, and project requirements to suggest the optimal workforce
                distribution.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


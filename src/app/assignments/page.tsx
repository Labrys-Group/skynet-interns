import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AssignmentSuggestions from "@/components/assignment-suggestions"
import ResourceOptimization from "@/components/resource-optimization"

export default function AssignmentsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight gradient-text">Resource Assignment</h1>
          <p className="text-muted-foreground">Optimize workforce allocation across projects</p>
        </div>

        <Card className="border-labrys-lightgray bg-labrys-darkgray">
          <CardHeader>
            <CardTitle className="text-labrys-green">Project Selection</CardTitle>
            <CardDescription>Select a project to view staffing suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="new" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-labrys-lightgray">
                <TabsTrigger value="new" className="data-[state=active]:bg-labrys-green data-[state=active]:text-black">
                  New Projects
                </TabsTrigger>
                <TabsTrigger
                  value="current"
                  className="data-[state=active]:bg-labrys-green data-[state=active]:text-black"
                >
                  Current Projects
                </TabsTrigger>
                <TabsTrigger value="all" className="data-[state=active]:bg-labrys-green data-[state=active]:text-black">
                  All Projects
                </TabsTrigger>
              </TabsList>
              <TabsContent value="new" className="pt-4 animate-fade-in">
                <AssignmentSuggestions projectStatus="New" />
              </TabsContent>
              <TabsContent value="current" className="pt-4 animate-fade-in">
                <AssignmentSuggestions projectStatus="Current" />
              </TabsContent>
              <TabsContent value="all" className="pt-4 animate-fade-in">
                <ResourceOptimization />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


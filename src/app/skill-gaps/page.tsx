import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SkillGapList from "@/components/skill-gap-list"
import LearningPlanView from "@/components/learning-plan-view"

export default function SkillGapsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight gradient-text">Skill Gap Analysis</h1>
          <p className="text-muted-foreground">Identify skill gaps and create learning plans</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-2 border-labrys-lightgray bg-labrys-darkgray card-hover">
            <CardHeader>
              <CardTitle className="text-labrys-green">Identified Skill Gaps</CardTitle>
              <CardDescription>
                Skills required by projects but missing or insufficient in the current workforce
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SkillGapList />
            </CardContent>
          </Card>

          <Card className="md:col-span-2 border-labrys-lightgray bg-labrys-darkgray card-hover">
            <CardHeader>
              <CardTitle className="text-labrys-green">Learning Plans</CardTitle>
              <CardDescription>AI-generated learning plans to address skill gaps</CardDescription>
            </CardHeader>
            <CardContent>
              <LearningPlanView />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


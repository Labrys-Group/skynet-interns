import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Function to extract skills from resume text
export async function extractSkillsFromResume(resumeText: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        Extract a comprehensive list of technical skills and experience from the following resume text.
        Format the output as a JSON array of strings containing only the skill names.
        Resume text:
        ${resumeText}
      `,
    })

    // Parse the response as JSON
    return JSON.parse(text)
  } catch (error) {
    console.error("Error extracting skills from resume:", error)
    return []
  }
}

// Function to extract required skills from project brief
export async function extractSkillsFromProjectBrief(briefText: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        Extract a comprehensive list of technical skills and technologies required from the following project brief.
        Format the output as a JSON array of strings containing only the skill names.
        Project brief:
        ${briefText}
      `,
    })

    // Parse the response as JSON
    return JSON.parse(text)
  } catch (error) {
    console.error("Error extracting skills from project brief:", error)
    return []
  }
}

// Function to generate learning plan for a skill
export async function generateLearningPlan(skill: string, employeeSkills: string[]) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        Generate a learning plan for someone who needs to learn ${skill}.
        They already know: ${employeeSkills.join(", ")}.
        Include 3-5 high-quality learning resources (courses, books, tutorials) with:
        - Title
        - Type (Course, Book, Tutorial, Article)
        - Provider/Author
        - Estimated duration to complete
        - Why it's recommended
        
        Format the output as a JSON object with:
        {
          "estimatedTimeToLearn": "X weeks/months",
          "resources": [
            {
              "title": "Resource title",
              "type": "Resource type",
              "provider": "Provider name",
              "duration": "Estimated duration",
              "rationale": "Why this resource is recommended"
            }
          ]
        }
      `,
    })

    // Parse the response as JSON
    return JSON.parse(text)
  } catch (error) {
    console.error("Error generating learning plan:", error)
    return null
  }
}


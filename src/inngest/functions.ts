import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { generateText } from "ai"
import { inngest } from "./client"

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_AI_API_KEY,
})

export const execute = inngest.createFunction(
  { id: "execute" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps } = await step.ai.wrap("gemini-generate-text", generateText, {
      model: google("gemini-2.5-flash"),
      system: "You are a helpful assistant",
      prompt: "what is 2 + 2",
    })

    return steps
  },
)

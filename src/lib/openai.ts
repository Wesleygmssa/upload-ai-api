import "dotenv/config"
import { OpenAI } from "openai"

export const openai = new OpenAI({
  apiKey: "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",
  // Outras configurações opcionais, se necessário
})

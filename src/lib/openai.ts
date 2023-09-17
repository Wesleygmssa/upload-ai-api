import "dotenv/config"
import { OpenAI } from "openai"

export const openai = new OpenAI({
  apiKey: "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",
  // Outras configurações opcionais, se necessário
})

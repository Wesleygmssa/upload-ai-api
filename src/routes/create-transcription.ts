import { FastifyInstance } from "fastify"
import { createReadStream } from "fs"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { openai } from "../lib/openai"

export async function createTranscriptionRoute(app: FastifyInstance) {
  app.post("/videos/:videoId/transcription", async (req) => {
    const paramsSchema = z.object({
      videoId: z.string().uuid(),
    })

    const { videoId } = paramsSchema.parse(req.params)

    const bodySchema = z.object({
      prompt: z.string(),
    })

    const { prompt } = bodySchema.parse(req.body)

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId,
      },
    })

    const videoPath = video.path
    // console.log("01", videoPath)
    const audioReadStream = createReadStream(videoPath)
    // console.log("02", audioReadStream)

    // fazer umm tratamento para o caso de não ter o arquivo de audio

    // if (!audioReadStream) {
    //   throw new Error("Audio file not found")
    // }

    // Simulando um arquivo como objeto
const simulatedFile = {
  // Dados do arquivo simulado
  name: 'nome_do_arquivo.wav', // Nome do arquivo
  type: 'audio/wav', // Tipo de mídia (pode variar dependendo do arquivo real)
  content: Buffer.from('conteúdo_do_arquivo_em_formato_binário'), // Conteúdo do arquivo em formato binário
};

    const response = await openai.audio.transcriptions.create({
      file: audioReadStream,
      model: 'whisper-1',
      language: 'pt',
      response_format: 'json',
      temperature: 0,
      prompt,
    })

    // console.log("03", response)

    // const transcription = response.text

    // await prisma.video.update({
    //   where: {
    //     id: videoId,
    //   },
    //   data: {
    //     transcript: transcription, // Use "transcript" instead of "transcription"
    //   },
    // })

    return {
      response,
    }
  })
}

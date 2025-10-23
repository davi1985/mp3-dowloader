import express, { Router, Request, Response } from 'express'
import { DownloadController } from '../controllers/download-controller.js'

export function setupDownloadRoutes(tempPath: string): Router {
  const router = express.Router()
  const controller = new DownloadController(tempPath)

  router.post('/download', (req: Request, res: Response) => 
    controller.downloadAudio(req, res)
  )

  router.get('/download/:filename', (req: Request, res: Response) => 
    controller.serveAndDeleteFile(req, res)
  )

  return router
}

import ytDlp from 'yt-dlp-exec'
import fs from 'fs'
import { join } from 'path'
import { Request, Response } from 'express'
import { FileManager } from '../utils/file-manager.js'

export class DownloadController {
  private tempPath: string
  private fileManager: FileManager

  constructor(tempPath: string) {
    this.tempPath = tempPath
    this.fileManager = new FileManager(tempPath)
  }

  public async downloadAudio(req: Request, res: Response): Promise<Response | void> {
    const { url } = req.body

    if (!url) {
      return res.status(400).json({ error: 'URL not provided' })
    }

    const timestamp = Date.now()
    const outputFile = `audio_${timestamp}.mp3`
    const outputPath = join(this.tempPath, outputFile)

    this.fileManager.ensure()

    try {
      console.log(`🎧 Downloading audio from: ${url}`)

      await ytDlp(url, {
        output: outputPath,
        extractAudio: true,
        audioFormat: 'mp3',
        audioQuality: 0,
        quiet: false,
      })

      console.log(`✅ Download completed: ${outputFile}`)

      return res.json({
        success: true,
        message: 'Download completed successfully!',
        filename: outputFile,
        downloadUrl: `/api/download/${outputFile}`,
      })
    } catch (err) {
      console.error('❌ Error downloading audio:', err)
      return res.status(500).json({
        error: 'Error downloading audio',
        details: err instanceof Error ? err.message : 'Unknown error',
      })
    }
  }

  public serveAndDeleteFile(req: Request, res: Response): Response | void {
    const { filename } = req.params
    const filePath = join(this.tempPath, filename)

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' })
    }

    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('❌ Error sending file:', err)
        return
      }

      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error('❌ Error deleting file:', unlinkErr)
        } else {
          console.log(`🗑️  File deleted: ${filename}`)
        }
      })
    })
  }
}

import fs from 'fs'
import { join } from 'path'

export class FileManager {
  private tempPath: string

  constructor(tempPath: string) {
    this.tempPath = tempPath
  }

  public clean(): void {
    if (fs.existsSync(this.tempPath)) {
      const files = fs.readdirSync(this.tempPath)
      
      files.forEach(file => {
        const filePath = join(this.tempPath, file)
        try {
          fs.unlinkSync(filePath)
          console.log(`🗑️  File removed: ${file}`)
        } catch (err) {
          console.error(`❌ Error removing ${file}:`, err)
        }
      })
      
      console.log(`✨ Temp folder cleaned (${files.length} file(s) removed)`)
    } else {
      fs.mkdirSync(this.tempPath)
      console.log('📁 Temp folder created')
    }
  }

  public ensure(): void {
    if (!fs.existsSync(this.tempPath)) {
      fs.mkdirSync(this.tempPath)
    }
  }
}

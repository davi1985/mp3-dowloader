import { App } from './config/app.js'
import { publicPath, tempPath } from './config/paths.js'
import { PORT } from './config/constants.js'
import { setupDownloadRoutes } from './routes/download-routes.js'
import { FileManager } from './utils/file-manager.js'

export class Server {
  private app: App
  private fileManager: FileManager
  private port: number

  constructor() {
    this.app = new App(publicPath)
    this.fileManager = new FileManager(tempPath)
    this.port = PORT
    
    this.initialize()
    this.setupRoutes()
    this.setupShutdownHandlers()
  }

  private initialize(): void {
    this.fileManager.clean()
    console.log('✅ Server initialized')
  }

  private setupRoutes(): void {
    const downloadRoutes = setupDownloadRoutes(tempPath)
    this.app.useRoutes('/api', downloadRoutes)
  }

  private setupShutdownHandlers(): void {
    const shutdown = (): void => {
      console.log('\n🛑 Shutting down server...')
      this.fileManager.clean()
      process.exit(0)
    }

    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running at http://localhost:${this.port}`)
      console.log(`📥 Access the web interface to download audio`)
    })
  }
}

const server = new Server()
server.start()

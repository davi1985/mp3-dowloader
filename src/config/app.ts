import express, { Application } from 'express'
import cors from 'cors'

export class App {
  public app: Application
  private publicPath: string

  constructor(publicPath: string) {
    this.app = express()
    this.publicPath = publicPath
    this.setupMiddlewares()
  }

  private setupMiddlewares(): void {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static(this.publicPath))
  }

  public useRoutes(path: string, router: express.Router): void {
    this.app.use(path, router)
  }

  public listen(port: number, callback: () => void): void {
    this.app.listen(port, callback)
  }

  public getInstance(): Application {
    return this.app
  }
}

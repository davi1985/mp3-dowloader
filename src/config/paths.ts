import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const rootPath: string = join(__dirname, '..', '..')
export const srcPath: string = join(__dirname, '..')
export const publicPath: string = join(rootPath, 'public')
export const tempPath: string = join(rootPath, 'temp')

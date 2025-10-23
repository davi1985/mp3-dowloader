declare module 'yt-dlp-exec' {
  interface YtDlpOptions {
    output?: string
    extractAudio?: boolean
    audioFormat?: string
    audioQuality?: number
    quiet?: boolean
    [key: string]: any
  }

  function ytDlp(url: string, options?: YtDlpOptions): Promise<void>
  
  export default ytDlp
}

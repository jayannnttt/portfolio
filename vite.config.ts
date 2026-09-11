import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

function fitflowScreenshotsPlugin(): Plugin {
  const desktopDir = 'C:\\Users\\sunda\\Desktop\\FITFLOW'
  const targetDir = path.resolve(import.meta.dirname, 'public', 'screenshots', 'fitflow')
  const manifestPath = path.resolve(targetDir, 'manifest.json')
  const jsonPath = path.resolve(import.meta.dirname, 'src', 'data', 'fitflowScreenshots.json')
  const tsPath = path.resolve(import.meta.dirname, 'src', 'data', 'fitflowScreenshots.ts')

  const syncImages = (): string[] => {
    try {
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true })
      }

      let files: string[] = []
      if (fs.existsSync(desktopDir)) {
        files = fs.readdirSync(desktopDir).filter((f) => /\.(png|jpe?g|webp|svg|avif)$/i.test(f))
        for (const f of files) {
          try {
            fs.copyFileSync(path.join(desktopDir, f), path.join(targetDir, f))
          } catch (e) {
            console.error('Failed copying screenshot:', f, e)
          }
        }
      } else if (fs.existsSync(targetDir)) {
        files = fs.readdirSync(targetDir).filter((f) => /\.(png|jpe?g|webp|svg|avif)$/i.test(f))
      }

      // Natural numerical sort: img 1 -> img 2 -> ... -> img 9 -> img 10
      const sorted = [...files].sort((a, b) => {
        const matchA = a.match(/\d+/)
        const matchB = b.match(/\d+/)
        const numA = matchA ? parseInt(matchA[0], 10) : 0
        const numB = matchB ? parseInt(matchB[0], 10) : 0
        return numA - numB
      })

      const urls = sorted.map((f) => `/screenshots/fitflow/${f}`)
      fs.writeFileSync(manifestPath, JSON.stringify(urls, null, 2))
      fs.writeFileSync(jsonPath, JSON.stringify(urls, null, 2))

      const tsContent = `/**
 * Automatically sorted list of FITFLOW screenshots.
 * Synced with C:\\Users\\sunda\\Desktop\\FITFLOW
 */
export const fitflowScreenshots: string[] = ${JSON.stringify(urls, null, 2)};

/**
 * Natural numerical sorting for screenshots.
 * Ensures: img 1 -> img 2 -> ... -> img 9 -> img 10 (never alphabetical)
 */
export function sortScreenshotsNumerically(images: string[]): string[] {
  return [...images].sort((a, b) => {
    const extractNum = (str: string) => {
      const filename = str.replace(/\\\\/g, '/').split('/').pop() || str;
      const match = filename.match(/\\d+/);
      return match ? parseInt(match[0], 10) : 0;
    };
    return extractNum(a) - extractNum(b);
  });
}
`
      fs.writeFileSync(tsPath, tsContent)
      return urls
    } catch (err) {
      console.warn('FITFLOW sync warning:', err)
      return []
    }
  }

  return {
    name: 'fitflow-screenshots-plugin',
    buildStart() {
      syncImages()
    },
    configureServer(server) {
      syncImages()

      if (fs.existsSync(desktopDir)) {
        server.watcher.add(desktopDir)
        server.watcher.on('all', (_event, filePath) => {
          if (filePath.startsWith(desktopDir)) {
            const urls = syncImages()
            server.ws.send({
              type: 'custom',
              event: 'fitflow-screenshots-updated',
              data: urls,
            })
          }
        })
      }

      server.middlewares.use('/api/fitflow-screenshots', (_req, res) => {
        const urls = syncImages()
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(urls))
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), fitflowScreenshotsPlugin()],
})

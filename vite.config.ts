import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-public-assets',
      apply: 'build',
      closeBundle: async () => {
        const src = path.resolve('assets/images')
        const dest = path.resolve('dist/assets/images')
        fs.mkdirSync(dest, { recursive: true })
        for (const file of fs.readdirSync(src)) {
          fs.copyFileSync(path.join(src, file), path.join(dest, file))
        }
      },
    },
  ],
})

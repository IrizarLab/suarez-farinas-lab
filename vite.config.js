import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/suarez-farinas-lab/', // GitHub Pages repo name
  server: {
    proxy: {
      '/pubmed-api': {
        target: 'https://eutils.ncbi.nlm.nih.gov',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pubmed-api/, '/entrez/eutils'),
      },
    },
  },
})

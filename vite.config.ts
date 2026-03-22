import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

async function getCloudflarePlugin() {
  if (process.env.VERCEL === '1') {
    return null
  }

  try {
    const { cloudflare } = await import('@cloudflare/vite-plugin')

    return cloudflare({ viteEnvironment: { name: 'ssr' } })
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'ERR_MODULE_NOT_FOUND' &&
      error instanceof Error &&
      error.message.includes('@cloudflare/vite-plugin')
    ) {
      return null
    }

    throw error
  }
}

const config = defineConfig(async () => {
  const cloudflarePlugin = await getCloudflarePlugin()

  return {
    plugins: [
      devtools(),
      ...(cloudflarePlugin ? [cloudflarePlugin] : []),
      tsconfigPaths({ projects: ['./tsconfig.json'] }),
      tailwindcss(),
      tanstackStart({
        prerender: {
          enabled: true,
          autoStaticPathsDiscovery: true,
          crawlLinks: true,
        },
      }),
      viteReact({
        babel: {
          plugins: ['babel-plugin-react-compiler'],
        },
      }),
    ],
  }
})

export default config

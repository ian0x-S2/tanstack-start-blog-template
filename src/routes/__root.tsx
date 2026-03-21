import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Footer from '../components/Footer'
import Header from '../components/Header'

import TanStackQueryProvider from '../integrations/tanstack-query/root-provider'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import { getLocale } from '#/paraglide/runtime'
import { siteMetadata } from '#/lib/site'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async () => {
    // Other redirect strategies are possible; see
    // https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#offline-redirect
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', getLocale())
    }
  },

  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: `${siteMetadata.title} | ${siteMetadata.description}`,
      },
      {
        name: 'description',
        content: siteMetadata.description,
      },
      {
        property: 'og:title',
        content: siteMetadata.title,
      },
      {
        property: 'og:description',
        content: siteMetadata.description,
      },
      {
        property: 'og:type',
        content: 'website',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  errorComponent: ({ error }) => (
    <main className="page-wrap px-4 pb-20 pt-16">
      <section className="hero-panel rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <p className="island-kicker mb-3">Something went wrong</p>
        <h1 className="display-title text-4xl font-semibold text-(--sea-ink) sm:text-5xl">
          The page could not be rendered.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-(--sea-ink-soft)">
          {error instanceof Error ? error.message : 'An unexpected error occurred.'}
        </p>
      </section>
    </main>
  ),
  notFoundComponent: () => (
    <main className="page-wrap px-4 pb-20 pt-16">
      <section className="hero-panel rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <p className="island-kicker mb-3">Not found</p>
        <h1 className="display-title text-4xl font-semibold text-(--sea-ink) sm:text-5xl">
          That page does not exist.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-(--sea-ink-soft)">
          Check the URL or return to the homepage.
        </p>
      </section>
    </main>
  ),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang={getLocale()} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="wrap-anywhere font-sans antialiased selection:bg-[rgba(79,184,178,0.24)]">
        <TanStackQueryProvider>
          <Header />
          {children}
          <Footer />
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
        </TanStackQueryProvider>
        <Scripts />
      </body>
    </html>
  )
}

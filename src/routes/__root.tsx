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
    <main className="page-wrap px-4 pb-24 pt-14">
      <p className="section-label mb-4">Error</p>
      <h1 className="heading-serif text-3xl font-semibold text-(--ink)">
        Something went wrong.
      </h1>
      <p className="mt-3 max-w-lg text-sm leading-6 text-(--ink-2)">
        {error instanceof Error ? error.message : 'An unexpected error occurred.'}
      </p>
    </main>
  ),
  notFoundComponent: () => (
    <main className="page-wrap px-4 pb-24 pt-14">
      <p className="section-label mb-4">404</p>
      <h1 className="heading-serif text-3xl font-semibold text-(--ink)">
        Page not found.
      </h1>
      <p className="mt-3 max-w-lg text-sm text-(--ink-2)">
        Check the URL or{' '}
        <a href="/" className="text-(--violet) hover:underline">
          return home
        </a>
        .
      </p>
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
      <body className="wrap-anywhere font-sans antialiased selection:bg-(--violet-subtle) selection:text-(--violet)">
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

import { createFileRoute } from '@tanstack/react-router'
import { m } from '#/paraglide/messages'
import LocaleSwitcher from '../components/LocaleSwitcher'

export const Route = createFileRoute('/demo/i18n')({
  component: App,
})

function App() {
  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)] gap-4">
        <div className="flex h-40 w-40 items-center justify-center rounded-full border border-white/15 bg-white/5 text-5xl font-semibold text-[#61dafb] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          i18n
        </div>
        <p>{m.example_message({ username: 'TanStack Router' })}</p>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://inlang.com/m/gerre34r/library-inlang-paraglideJs"
          target="_blank"
          rel="noopener noreferrer"
        >
          {m.learn_router()}
        </a>
        <div className="mt-3">
          <LocaleSwitcher />
        </div>
      </header>
    </div>
  )
}

// Locale switcher refs:
// - Paraglide docs: https://inlang.com/m/gerre34r/library-inlang-paraglideJs
// - Router example: https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#switching-locale
import { getLocale, locales, setLocale } from '#/paraglide/runtime'
import { m } from '#/paraglide/messages'

export default function ParaglideLocaleSwitcher() {
  const currentLocale = getLocale()

  return (
    <div className="flex items-center gap-0.5" aria-label={m.language_label()}>
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => setLocale(locale)}
          aria-pressed={locale === currentLocale}
          className={
            locale === currentLocale
              ? 'flex h-7 items-center rounded-md border border-[var(--line-strong)] bg-[var(--surface-hover)] px-2.5 text-[12px] font-semibold text-[var(--ink)] cursor-pointer'
              : 'flex h-7 items-center rounded-md border border-transparent px-2.5 text-[12px] font-medium text-[var(--ink-3)] hover:bg-[var(--surface)] hover:text-[var(--ink-2)] cursor-pointer'
          }
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

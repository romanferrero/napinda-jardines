/**
 * Logo "Ñapinda" — combinación de marca tipográfica + ícono de hoja.
 */
export default function Logo({ className = '', light = false }) {
  const text = light ? 'text-cream' : 'text-forest-700'
  const accent = light ? 'text-leaf-300' : 'text-leaf-500'

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className={`w-7 h-7 ${accent}`}
        aria-hidden="true"
      >
        <path
          d="M16 3c0 7-4 12-9 13 5 1 9 5 9 13 0-8 4-12 9-13-5-1-9-6-9-13Z"
          fill="currentColor"
        />
      </svg>
      <span className={`font-display text-xl tracking-tight leading-none ${text}`}>
        Ñapinda
        <span className={`align-baseline text-sm ml-1.5 font-light ${light ? 'text-cream/60' : 'text-ink-mute'}`}>
          jardines
        </span>
      </span>
    </div>
  )
}

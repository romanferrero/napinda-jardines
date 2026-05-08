/**
 * Logo "Ñapinda".
 *
 * Props:
 *   - size: 'sm' | 'md' | 'lg' | 'xl' | '2xl'   (default 'md')
 *   - light: bool — usa la versión clara para fondo oscuro
 *   - showSubtitle: bool — muestra "jardines" debajo (default true)
 */
import { useEffect, useState } from 'react'

const SIZES = {
  sm: { img: 'h-7 md:h-8', mark: 'w-6 h-6', name: 'text-base', sub: 'text-xs ml-1' },
  md: { img: 'h-9 md:h-10', mark: 'w-7 h-7', name: 'text-xl', sub: 'text-sm ml-1.5' },
  lg: { img: 'h-11 md:h-12', mark: 'w-9 h-9', name: 'text-2xl md:text-[1.75rem]', sub: 'text-sm md:text-base ml-2' },
  xl: { img: 'h-14 md:h-16', mark: 'w-11 h-11 md:w-12 md:h-12', name: 'text-3xl md:text-4xl', sub: 'text-base md:text-lg ml-2' },
  '2xl': { img: 'h-20 md:h-24', mark: 'w-14 h-14 md:w-16 md:h-16', name: 'text-4xl md:text-5xl', sub: 'text-lg md:text-xl ml-2' },
}

export default function Logo({
  className = '',
  light = false,
  size = 'md',
  showSubtitle = true,
}) {
  const src = light ? '/logo.png' : '/logo.png'
  const [status, setStatus] = useState('unknown')
  const sz = SIZES[size] ?? SIZES.md

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.onload = () => !cancelled && setStatus('ok')
    img.onerror = () => !cancelled && setStatus('fail')
    img.src = src
    return () => { cancelled = true }
  }, [src])

  if (status === 'ok') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <img src={src} alt="Ñapinda Jardines" className={`${sz.img} w-auto`} />
      </div>
    )
  }

  // Fallback tipográfico
  const text = light ? 'text-cream' : 'text-forest-700'
  const accent = light ? 'text-leaf-300' : 'text-leaf-500'
  const sub = light ? 'text-cream/60' : 'text-ink-mute'

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className={`${sz.mark} ${accent}`}
        aria-hidden="true"
      >
        <path
          d="M16 3c0 7-4 12-9 13 5 1 9 5 9 13 0-8 4-12 9-13-5-1-9-6-9-13Z"
          fill="currentColor"
        />
      </svg>
      <span className={`font-display tracking-tight leading-none ${sz.name} ${text}`}>
        Ñapinda
        {showSubtitle && (
          <span className={`align-baseline font-light ${sz.sub} ${sub}`}>
            jardines
          </span>
        )}
      </span>
    </div>
  )
}

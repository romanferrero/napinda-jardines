/**
 * Logo "Ñapinda".
 *
 * Si subís un archivo a /public/logo.png (o /logo-light.png para fondo
 * oscuro), automáticamente se usa esa imagen. Mientras no exista, mostramos
 * el logo tipográfico (sin parpadeos ni imagen rota gracias a la
 * precarga con `new Image()`).
 *
 * Para subir el logo:
 *    napinda-jardines/public/logo.png        (variante para fondo cream)
 *    napinda-jardines/public/logo-light.png  (variante para fondo oscuro)
 *
 * Tamaño recomendado: 200-400px de ancho, formato PNG con fondo transparente.
 */
import { useEffect, useState } from 'react'

export default function Logo({ className = '', light = false }) {
  const src = light ? '/logo-light.png' : '/logo.png'
  // 'unknown' (mientras prueba) | 'ok' (existe) | 'fail' (mostrar fallback)
  const [status, setStatus] = useState('unknown')

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
        <img src={src} alt="Ñapinda Jardines" className="h-9 md:h-10 w-auto" />
      </div>
    )
  }

  // Fallback tipográfico (también se muestra mientras 'unknown')
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

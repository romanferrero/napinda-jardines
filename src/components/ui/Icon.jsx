/**
 * Set de íconos SVG inline. Toman currentColor para integrarse fácil.
 * Uso: <Icon name="leaf" className="w-6 h-6 text-forest-500" />
 *
 * Importante: el icono "whatsapp" usa fill (no stroke) — internamente
 * el componente desactiva stroke cuando detecta que el path es solid.
 */
const paths = {
  leaf: (
    <>
      <path d="M11 20A7 7 0 0 1 4 13V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v6a9 9 0 0 1-9 9Z" />
      <path d="M4 13c5 0 12 0 15-9" />
    </>
  ),
  shovel: (
    <>
      <path d="M2 22 7 17" />
      <path d="m17.5 6.5-3-3a3 3 0 0 0-4.243 0l-2.5 2.5L13.5 11l2.5-2.5a3 3 0 0 0 0-4.243Z" />
      <path d="m6 12 6 6" />
      <path d="m9 9-3 3a3 3 0 0 0 0 4.243L7.757 18a3 3 0 0 0 4.243 0l3-3" />
    </>
  ),
  sprout: (
    <>
      <path d="M7 20h10" />
      <path d="M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4C7.9 8.9 6.4 8.6 5 8.6 3 8.6 2 10 2 12c0 1.6 1.6 3 3.5 3 .9 0 1.7-.2 2.5-.6" />
      <path d="M14.1 6c1.6-2 3-2.6 4.4-2.6 2 0 3.5 1.4 3.5 3.4 0 1.6-1.6 3.2-3.5 3.2-.9 0-1.7-.2-2.5-.6" />
    </>
  ),
  droplet: (
    <path d="M12 2.5c4 5 7 8.5 7 12.5a7 7 0 1 1-14 0c0-4 3-7.5 7-12.5Z" />
  ),
  grass: (
    <>
      <path d="M3 21c0-7 3-12 6-12" />
      <path d="M9 21c0-9 3-15 6-15" />
      <path d="M15 21c0-7 3-12 6-12" />
    </>
  ),
  flower: (
    <>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 9.5V6a2.5 2.5 0 1 1 0-0.001" />
      <path d="M12 14.5V18a2.5 2.5 0 1 0 0 0.001" />
      <path d="M14.5 12H18a2.5 2.5 0 1 0 -0.001 0" />
      <path d="M9.5 12H6a2.5 2.5 0 1 1 0.001 0" />
      <path d="M12 18v3" />
      <path d="M9 21h6" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m16 8-2 6-6 2 2-6 6-2Z" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </>
  ),
  facebook: (
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
  ),
  // WhatsApp: SVG oficial-style (filled). Ver Icon's render para fill mode.
  whatsapp: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.077 4.928A9.969 9.969 0 0 0 12.011 2c-5.506 0-9.987 4.479-9.987 9.985 0 1.76.46 3.479 1.331 4.992L2 22l5.169-1.323a9.96 9.96 0 0 0 4.842 1.234h.004c5.504 0 9.985-4.48 9.985-9.985a9.969 9.969 0 0 0-2.923-7.073zm-7.066 15.36h-.003a8.32 8.32 0 0 1-4.222-1.151l-.302-.18-3.124.8.832-3.04-.196-.314a8.236 8.236 0 0 1-1.273-4.408c.002-4.575 3.726-8.298 8.296-8.298a8.246 8.246 0 0 1 5.866 2.43 8.243 8.243 0 0 1 2.428 5.873c-.002 4.574-3.726 8.288-8.302 8.288zm4.554-6.207c-.249-.124-1.475-.728-1.703-.811-.228-.083-.394-.124-.56.125-.165.249-.643.811-.788.977-.145.166-.29.187-.539.063-.249-.125-1.054-.388-2.008-1.24-.742-.661-1.243-1.479-1.388-1.728-.146-.249-.016-.384.109-.508.112-.111.249-.29.374-.435.124-.146.166-.249.249-.415.083-.166.041-.311-.021-.435-.062-.124-.56-1.348-.768-1.847-.202-.486-.408-.42-.56-.428a9.97 9.97 0 0 0-.477-.009.917.917 0 0 0-.665.311c-.228.249-.871.85-.871 2.073 0 1.224.892 2.405 1.017 2.572.124.166 1.755 2.681 4.252 3.762.594.257 1.058.41 1.42.524.596.19 1.139.163 1.568.099.479-.072 1.475-.604 1.683-1.187.207-.583.207-1.083.145-1.187-.062-.103-.228-.166-.477-.29z"
    />
  ),
  mapPin: (
    <>
      <path d="M12 22s7-7.4 7-12a7 7 0 1 0-14 0c0 4.6 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.5 2.5a2 2 0 0 1-.5 2.1L7.9 9.6a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.8.3 1.6.4 2.5.5A2 2 0 0 1 22 16.9Z" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </>
  ),
  check: <path d="m4 12 5 5L20 6" />,
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
}

// Iconos que se renderizan en modo "fill" (sólido) en vez de "stroke" (lineal).
const FILLED = new Set(['whatsapp', 'facebook'])

export default function Icon({ name, className = 'w-6 h-6', strokeWidth = 1.6, ...rest }) {
  const path = paths[name]
  if (!path) return null

  const isFilled = FILLED.has(name)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={isFilled ? 'currentColor' : 'none'}
      stroke={isFilled ? 'none' : 'currentColor'}
      strokeWidth={isFilled ? 0 : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {path}
    </svg>
  )
}

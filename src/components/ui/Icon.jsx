/**
 * Set de íconos SVG inline. Toman currentColor para integrarse fácil.
 * Uso: <Icon name="leaf" className="w-6 h-6 text-forest-500" />
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
  whatsapp: (
    <path d="M20.5 3.5A11 11 0 0 0 3.6 17.1L2 22l5-1.6A11 11 0 1 0 20.5 3.5ZM12 20a8 8 0 0 1-4-1l-3 1 1-3a8 8 0 1 1 6 3Zm4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1l-.8 1c-.1.1-.3.1-.5 0a6 6 0 0 1-3-2.6c0-.2 0-.3.1-.4l.4-.5c.1-.1.1-.2.2-.3 0-.1 0-.2-.1-.3L9.6 8c-.1-.3-.3-.3-.4-.3H8.6a1 1 0 0 0-.7.3 2.7 2.7 0 0 0-.9 2c0 1.2.9 2.4 1 2.6.1.1 1.7 2.7 4.2 3.7 2 .8 2.4.6 2.9.6.4 0 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.2Z" />
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

export default function Icon({ name, className = 'w-6 h-6', strokeWidth = 1.6, ...rest }) {
  const path = paths[name]
  if (!path) return null

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
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

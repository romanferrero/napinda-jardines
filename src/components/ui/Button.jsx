/**
 * Botón con variantes y tamaños. Renderiza <a> si recibe `href`.
 */
const variants = {
  primary:
    'bg-forest-500 text-cream hover:bg-forest-600 active:bg-forest-700 focus-visible:outline-forest-500',
  secondary:
    'bg-transparent text-cream border border-cream/40 hover:bg-cream/10 hover:border-cream focus-visible:outline-cream',
  outline:
    'bg-transparent text-forest-600 border border-forest-500/40 hover:bg-forest-500/5 hover:border-forest-500 focus-visible:outline-forest-500',
  ghost:
    'bg-transparent text-forest-600 hover:text-forest-700 hover:underline underline-offset-4 focus-visible:outline-forest-500',
}

const sizes = {
  sm: 'text-sm px-4 py-2',
  md: 'text-base px-5 py-3',
  lg: 'text-base px-7 py-3.5',
}

export default function Button({
  as,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  const classes = `inline-flex items-center justify-center gap-2 font-medium rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${sizes[size]} ${className}`

  if (href || as === 'a') {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}

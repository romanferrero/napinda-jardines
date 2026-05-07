import FadeIn from './FadeIn'

/**
 * Encabezado de sección reutilizable: eyebrow + título + subtítulo.
 */
export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  light = false,
  className = '',
}) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const eyebrowColor = light ? 'text-leaf-300' : 'text-leaf-600'
  const titleColor = light ? 'text-cream' : 'text-ink'
  const subColor = light ? 'text-cream/70' : 'text-ink-soft'

  return (
    <FadeIn className={`max-w-2xl ${alignment} ${className}`}>
      {eyebrow && (
        <p
          className={`text-xs font-medium tracking-[0.18em] uppercase mb-4 ${eyebrowColor}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05] tracking-tight ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-base md:text-lg leading-relaxed ${subColor}`}>
          {subtitle}
        </p>
      )}
    </FadeIn>
  )
}

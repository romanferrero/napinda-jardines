import { motion } from 'framer-motion'

/**
 * Wrapper de animación: fade + leve subida cuando entra en viewport.
 */
export default function FadeIn({
  as: As = 'div',
  delay = 0,
  y = 24,
  duration = 0.7,
  once = true,
  className = '',
  children,
  ...rest
}) {
  const MotionTag = motion[As] ?? motion.div
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -80px 0px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

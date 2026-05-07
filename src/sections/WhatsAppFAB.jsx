<<<<<<< HEAD
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
=======
import { motion } from 'framer-motion'
>>>>>>> fbcb7265dd781026627095a3b8bb2690793cc395
import { site } from '../data/site'
import Icon from '../components/ui/Icon'

/**
 * Botón flotante de WhatsApp.
<<<<<<< HEAD
 * Aparece SOLO después de scrollear más allá del Hero (cuando el viewport
 * dejó atrás la primera pantalla). En el inicio compite visualmente con
 * los CTAs del hero, así que ahí se mantiene oculto.
 */
export default function WhatsAppFAB() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Aparece cuando el scroll superó el ~80% del viewport (fin del hero)
      setShow(window.scrollY > window.innerHeight * 0.8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          key="whatsapp-fab"
          href={site.contact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir WhatsApp"
          initial={{ opacity: 0, y: 20, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.85 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white shadow-[var(--shadow-lift)] flex items-center justify-center hover:shadow-[0_8px_30px_rgb(37,211,102,0.35)] transition-shadow"
        >
          <Icon name="whatsapp" className="w-7 h-7 md:w-8 md:h-8" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-60" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-leaf-300" />
          </span>
        </motion.a>
      )}
    </AnimatePresence>
=======
 */
export default function WhatsAppFAB() {
  return (
    <motion.a
      href={site.contact.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir WhatsApp"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white shadow-[var(--shadow-lift)] flex items-center justify-center hover:shadow-[0_8px_30px_rgb(37,211,102,0.35)] transition-shadow"
    >
      <Icon name="whatsapp" className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.4} />
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-60" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-leaf-300" />
      </span>
    </motion.a>
>>>>>>> fbcb7265dd781026627095a3b8bb2690793cc395
  )
}

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { site } from '../../data/site'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import Icon from '../ui/Icon'

/**
 * Navbar fija con cambio de fondo al hacer scroll y menú móvil deslizable.
 * Logo en tamaño "lg" para darle protagonismo a la marca.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const headerBg = scrolled
    ? 'bg-cream/95 backdrop-blur-md border-b border-ink/5 shadow-[0_1px_0_rgba(0,0,0,0.02)]'
    : 'bg-transparent border-b border-transparent'

  const linkColor = scrolled
    ? 'text-ink-soft hover:text-forest-700'
    : 'text-cream/90 hover:text-cream drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]'

  const hamburgerCls = scrolled
    ? 'bg-forest-500/8 hover:bg-forest-500/12 text-forest-700'
    : 'bg-cream/15 hover:bg-cream/25 text-cream backdrop-blur-sm'

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${headerBg}`}>
        <div className="mx-auto max-w-7xl container-px h-20 md:h-24 flex items-center justify-between">
          <a href="/" aria-label="Inicio" className="flex items-center">
            <Logo size="lg" light={!scrolled} />
          </a>

          <nav className="hidden lg:flex items-center gap-9">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${linkColor}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              href={site.contact.whatsappHref}
              variant={scrolled ? 'primary' : 'secondary'}
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" className="w-4 h-4" />
              Contáctanos
            </Button>
          </div>

          <button
            type="button"
            className={`lg:hidden w-11 h-11 rounded-full flex items-center justify-center transition-colors ${hamburgerCls}`}
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
          >
            <Icon name="menu" className="w-6 h-6" strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* Overlay del menú móvil — fuera del <header> para evitar issues
          de stacking-context. Bg sólido garantizado con inline style. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-[100] text-cream"
            style={{ backgroundColor: '#1c2c1f' }}
          >
            <div className="container-px h-20 md:h-24 flex items-center justify-between max-w-7xl mx-auto">
              <Logo size="lg" light />
              <button
                type="button"
                className="w-11 h-11 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center"
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
              >
                <Icon name="close" className="w-6 h-6" strokeWidth={2} />
              </button>
            </div>

            <motion.nav
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="container-px max-w-7xl mx-auto pt-8 flex flex-col"
            >
              {site.nav.map((item, idx) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-cream text-4xl py-4 border-b border-cream/10 hover:text-leaf-200 transition-colors"
                >
                  <span className="text-leaf-300/60 text-sm align-top mr-3">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </a>
              ))}

              <div className="mt-10">
                <Button
                  href={site.contact.whatsappHref}
                  variant="secondary"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Icon name="whatsapp" className="w-5 h-5" />
                  Contáctanos
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

import { motion } from 'framer-motion'
import { site } from '../data/site'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'

const heroImg =
  'https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=2000&q=80'

/**
 * Hero a pantalla completa con foto, título serif grande y dos CTAs.
 */
export default function Hero() {
  const ease = [0.22, 1, 0.36, 1]

  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] flex items-end overflow-hidden text-cream"
    >
      <div className="absolute inset-0">
        <motion.img
          src={heroImg}
          alt="Jardín diseñado por Ñapinda"
          className="w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/30 via-forest-900/40 to-forest-900/85" />
      </div>

      <Container className="relative pb-20 md:pb-28 pt-32 z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
          className="text-leaf-200 text-xs md:text-sm font-medium tracking-[0.2em] uppercase mb-6"
        >
          Paisajismo · Uruguay
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.45 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.98] tracking-tight max-w-4xl text-cream"
        >
          Jardines que{' '}
          <span className="italic font-light text-leaf-200">
            cuentan historias.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.7 }}
          className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-cream/85"
        >
          Diseñamos, construimos y mantenemos espacios verdes en todo el país.
          Cada proyecto nace de una mirada sensible del lugar, pensado para crecer con el tiempo y acompañar a quienes lo habitan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button
            href={site.contact.whatsappHref}
            variant="primary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" className="w-5 h-5" />
            Contáctanos
          </Button>
          <Button href="#servicios" variant="secondary" size="lg">
            Ver servicios
            <Icon name="arrowRight" className="w-4 h-4" />
          </Button>
        </motion.div>
      </Container>

      <motion.a
        href="#nosotros"
        aria-label="Bajar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="hidden md:flex absolute bottom-8 right-8 lg:right-12 items-center gap-3 text-xs uppercase tracking-[0.2em] text-cream/70 hover:text-cream transition-colors"
      >
        Explorá
        <span className="block w-px h-10 bg-cream/40 origin-top">
          <motion.span
            className="block w-px bg-cream"
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{
              duration: 1.6,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        </span>
      </motion.a>
    </section>
  )
}

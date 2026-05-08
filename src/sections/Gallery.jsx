import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gallery } from '../data/gallery'
import Container from '../components/ui/Container'
import SectionTitle from '../components/ui/SectionTitle'
import FadeIn from '../components/ui/FadeIn'
import Icon from '../components/ui/Icon'

/**
 * Galería.
 */
export default function Gallery() {
  const [activeProject, setActiveProject] = useState(null)
  const [activePhoto, setActivePhoto] = useState(0)

  const project = activeProject !== null ? gallery[activeProject] : null
  const photos = project?.photos ?? []

  const close = useCallback(() => {
    setActiveProject(null)
    setActivePhoto(0)
  }, [])

  const next = useCallback(() => {
    if (!photos.length) return
    setActivePhoto((i) => (i + 1) % photos.length)
  }, [photos.length])

  const prev = useCallback(() => {
    if (!photos.length) return
    setActivePhoto((i) => (i - 1 + photos.length) % photos.length)
  }, [photos.length])

  useEffect(() => {
    if (activeProject === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeProject, close, next, prev])

  return (
    <section id="galeria" className="py-24 md:py-32 bg-cream">
      <Container>
        <SectionTitle
          eyebrow="Galería"
          title="Algunos espacios que fuimos trabajando."
          subtitle="Cada espacio es único. En cada proyecto buscamos que el diseño, las especies y los detalles convivan en armonía. Recorré cada proyecto para conocer más sobre su proceso y resultado."
          align="center"
          className="mx-auto"
        />

        <FadeIn className="mt-14">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [&>*]:mb-5">
            {gallery.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveProject(idx)
                  setActivePhoto(0)
                }}
                className="group block w-full break-inside-avoid relative overflow-hidden rounded-2xl bg-leaf-100 cursor-zoom-in"
                style={{ aspectRatio: item.aspect }}
              >
                <img
                  src={item.cover}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-forest-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 inset-x-0 p-5 text-left text-cream translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-xs uppercase tracking-[0.18em] text-leaf-200 mb-1">
                    {item.category}
                  </p>
                  <p className="font-display text-xl text-cream">{item.title}</p>
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-forest-900/65 backdrop-blur-sm text-cream text-xs font-medium opacity-90">
                  {item.photos.length} fotos
                </div>
              </button>
            ))}
          </div>
        </FadeIn>
      </Container>

      <AnimatePresence>
        {project && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-forest-900/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={close}
          >
            <button
              type="button"
              aria-label="Cerrar"
              className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full bg-cream/10 hover:bg-cream/20 text-cream flex items-center justify-center z-10"
              onClick={(e) => { e.stopPropagation(); close() }}
            >
              <Icon name="close" className="w-6 h-6" />
            </button>

            {photos.length > 1 && (
              <button
                type="button"
                aria-label="Foto anterior"
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cream/10 hover:bg-cream/20 text-cream flex items-center justify-center z-10"
                onClick={(e) => { e.stopPropagation(); prev() }}
              >
                <Icon name="arrowRight" className="w-6 h-6 rotate-180" />
              </button>
            )}

            {photos.length > 1 && (
              <button
                type="button"
                aria-label="Foto siguiente"
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cream/10 hover:bg-cream/20 text-cream flex items-center justify-center z-10"
                onClick={(e) => { e.stopPropagation(); next() }}
              >
                <Icon name="arrowRight" className="w-6 h-6" />
              </button>
            )}

            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lg:col-span-8 relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activePhoto}
                    src={photos[activePhoto]}
                    alt={`${project.title} - foto ${activePhoto + 1}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full max-h-[72vh] object-contain rounded-xl"
                  />
                </AnimatePresence>

                {photos.length > 1 && (
                  <div className="mt-3 flex items-center justify-center gap-2">
                    {photos.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActivePhoto(i)}
                        aria-label={`Ver foto ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all ${i === activePhoto ? 'w-6 bg-leaf-300' : 'w-1.5 bg-cream/30 hover:bg-cream/60'}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:col-span-4 text-cream">
                <p className="text-leaf-300 text-xs uppercase tracking-[0.2em] mb-3">
                  {project.category}
                </p>
                <h3 className="font-display text-3xl md:text-4xl leading-tight text-cream">
                  {project.title}
                </h3>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-cream/60">
                  {project.location && (
                    <span className="flex items-center gap-1.5">
                      <Icon name="mapPin" className="w-4 h-4" />
                      {project.location}
                    </span>
                  )}
                  {project.year && <span>· {project.year}</span>}
                </div>
                {project.description && (
                  <p className="mt-5 text-cream/80 leading-relaxed text-sm md:text-base">
                    {project.description}
                  </p>
                )}
                <p className="mt-6 text-xs text-cream/40">
                  Foto {activePhoto + 1} de {photos.length} · ← → para navegar
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

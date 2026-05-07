import { values, stats } from '../data/values'
import { site } from '../data/site'
import Container from '../components/ui/Container'
import SectionTitle from '../components/ui/SectionTitle'
import FadeIn from '../components/ui/FadeIn'

const portrait =
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1400&q=80'

/**
 * Sección "Nosotros": dos columnas con imagen y texto, valores y stats.
 */
export default function About() {
  return (
    <section id="nosotros" className="py-24 md:py-32 bg-cream bg-grain">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          <FadeIn className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-[var(--shadow-lift)]">
              <img
                src={portrait}
                alt="El equipo de Ñapinda en obra"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-6 flex items-center gap-3 text-ink-mute">
              <span className="block w-10 h-px bg-leaf-500" />
              <p className="text-sm">Equipo Ñapinda · {site.contact.address}</p>
            </div>
          </FadeIn>

          <div className="lg:col-span-7">
            <SectionTitle
              eyebrow="Nosotros"
              title="Hacemos jardines con oficio, sensibilidad y tiempo."
              subtitle={site.longPitch}
            />

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {values.map((value, idx) => (
                <FadeIn key={value.id} delay={idx * 0.08}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-display italic text-leaf-600 text-sm">
                      0{idx + 1}
                    </span>
                    <span className="block w-8 h-px bg-leaf-500/40" />
                    <h3 className="font-display text-xl">{value.title}</h3>
                  </div>
                  <p className="text-ink-soft leading-relaxed">
                    {value.description}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        <FadeIn className="mt-24 md:mt-32">
          <div className="rounded-3xl bg-forest-700 text-cream py-12 md:py-14 px-8 md:px-14 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="font-display text-5xl md:text-6xl text-leaf-200 leading-none">
                  {stat.value}
                </p>
                <p className="mt-3 text-cream/70 text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

import { services } from '../data/services'
import Container from '../components/ui/Container'
import SectionTitle from '../components/ui/SectionTitle'
import FadeIn from '../components/ui/FadeIn'
import Icon from '../components/ui/Icon'
import Button from '../components/ui/Button'
import { site } from '../data/site'

/**
 * Grid de cards de servicios.
 */
export default function Services() {
  return (
    <section id="servicios" className="py-24 md:py-32 bg-bone">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14">
          <SectionTitle
            eyebrow="Lo que hacemos"
            title="Servicios para crear y cuidar espacios verdes."
            subtitle="Desarrollamos proyectos de paisajismo en jardines particulares, terrazas, interiores, estancias, chacras, urbanizaciones y espacios públicos. 
                      Acompañamos cada etapa del proceso, desde el diseño inicial hasta la ejecución y el cuidado posterior."
          />
          <Button href="#contacto" variant="outline" size="md">
            Hablemos del tuyo
            <Icon name="arrowRight" className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, idx) => (
            <FadeIn key={service.id} delay={idx * 0.06}>
              <article className="group h-full p-7 rounded-2xl bg-cream border border-leaf-100 hover:border-leaf-300 hover:bg-cream-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
                <div className="w-12 h-12 rounded-xl bg-leaf-100 text-forest-600 flex items-center justify-center group-hover:bg-leaf-200 group-hover:text-forest-700 transition-colors">
                  <Icon name={service.icon} className="w-6 h-6" />
                </div>

                <h3 className="font-display text-2xl mt-6">{service.title}</h3>
                <p className="mt-3 text-ink-soft leading-relaxed">
                  {service.summary}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-ink-soft">
                      <Icon
                        name="check"
                        className="w-4 h-4 mt-0.5 text-leaf-500 flex-shrink-0"
                        strokeWidth={2.2}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-16 text-center">
          <p className="text-ink-mute text-sm">
            ¿Tenés algo distinto en mente?{' '}
            <a
              href={site.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-forest-600 hover:text-forest-700 underline underline-offset-4"
            >
              Conversemos por WhatsApp
            </a>
            .
          </p>
        </FadeIn>
      </Container>
    </section>
  )
}

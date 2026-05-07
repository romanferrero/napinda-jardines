import { team } from '../data/team'
import Container from '../components/ui/Container'
import SectionTitle from '../components/ui/SectionTitle'
import FadeIn from '../components/ui/FadeIn'

/**
 * Sección "Quienes lideran" — fotos y bio breve de las dueñas.
 * Pensada para vivir entre Nosotros y Servicios; se puede mover sola.
 */
export default function Team() {
  return (
    <section id="nosotras" className="py-24 md:py-28 bg-bone">
      <Container>
        <SectionTitle
          eyebrow="Nosotras"
          title="Diseñamos desde la cercanía."
          subtitle="Nos involucramos personalmente en cada etapa del proyecto. Escuchamos, observamos y acompañamos el proceso para que cada jardín refleje su entorno y a quienes lo habitan."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
          {team.map((person, idx) => (
            <FadeIn key={person.id} delay={idx * 0.1}>
              <article className="group">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-leaf-100">
                  <img
                    src={person.photo}
                    alt={person.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="font-display text-2xl mt-5">{person.name}</h3>
                <p className="text-leaf-600 text-sm font-medium mt-1">
                  {person.role}
                </p>
                {person.bio && (
                  <p className="mt-3 text-ink-soft leading-relaxed text-sm">
                    {person.bio}
                  </p>
                )}
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}

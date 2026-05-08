import { clients } from '../data/clients'
import Container from '../components/ui/Container'
import SectionTitle from '../components/ui/SectionTitle'
import FadeIn from '../components/ui/FadeIn'

/**
 * Sección Clientes
 */
export default function Clients() {
  if (!clients.length) return null

  return (
    <section id="clientes" className="py-20 md:py-24 bg-cream">
      <Container>
        <SectionTitle
          eyebrow="Clientes"
          title="Algunos de quienes confiaron en nuestro trabajo."
          subtitle="Empresas, instituciones, estudios y clientes particulares que nos eligieron para crear y cuidar sus espacios."
          align="center"
          className="mx-auto"
        />

        <FadeIn className="mt-12 md:mt-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10 items-center">
            {clients.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-center"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  loading="lazy"
                  className="max-h-12 md:max-h-14 w-auto opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

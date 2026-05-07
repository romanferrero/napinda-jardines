import Hero from '../sections/Hero'
import About from '../sections/About'
import Team from '../sections/Team'
import Services from '../sections/Services'
import Gallery from '../sections/Gallery'
import Clients from '../sections/Clients'
import Contact from '../sections/Contact'
import WhatsAppFAB from '../sections/WhatsAppFAB'

/**
 * Página principal: compone todas las secciones en orden.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Team />
      <Services />
      <Gallery />
      <Clients />
      <Contact />
      <WhatsAppFAB />
    </>
  )
}

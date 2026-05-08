import { site } from '../../data/site'
import Container from '../ui/Container'
import Logo from '../ui/Logo'
import Icon from '../ui/Icon'

/**
 * Footer en verde profundo con marca prominente:
 * - Logo en tamaño xl arriba
 * - Watermark "ÑAPINDA" gigante decorativo en el fondo
 * - Bloques de contacto, navegación y redes
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer relative bg-forest-700 text-cream/80 overflow-hidden">
      <Container className="relative pt-14 md:pt-20 pb-28 sm:pb-40 md:pb-56">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-5">
            {/* Logo más compacto en mobile, prominente en desktop */}
            <span className="md:hidden">
              <Logo size="lg" light />
            </span>
            <span className="hidden md:inline-flex">
              <Logo size="xl" light />
            </span>
            <p className="mt-5 md:mt-6 max-w-sm text-cream/65 leading-relaxed">
              {site.shortPitch}
            </p>

            <div className="mt-7 md:mt-8 flex items-center gap-3 sm:gap-4">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                 className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream/10 transition-colors">
                <Icon name="instagram" className="w-5 h-5" />
              </a>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                 className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream/10 transition-colors">
                <Icon name="facebook" className="w-5 h-5" />
              </a>
              <a href={site.contact.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                 className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream/10 transition-colors">
                <Icon name="whatsapp" className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-cream font-display text-lg mb-4 md:mb-5">Sitio</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-leaf-200 transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-cream font-display text-lg mb-4 md:mb-5">Contacto</h4>
            <ul className="space-y-3.5 sm:space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Icon name="phone" className="w-4 h-4 mt-1 flex-shrink-0 text-leaf-300" />
                <div className="flex flex-col">
                  <a href={site.contact.phoneHref} className="hover:text-leaf-200 transition-colors">{site.contact.phone}</a>
                  {site.contact.phoneTwo && (
                    <a href={site.contact.phoneTwoHref} className="hover:text-leaf-200 transition-colors">{site.contact.phoneTwo}</a>
                  )}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="mail" className="w-4 h-4 mt-1 flex-shrink-0 text-leaf-300" />
                <a href={site.contact.emailHref} className="hover:text-leaf-200 transition-colors break-all">{site.contact.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="mapPin" className="w-4 h-4 mt-1 flex-shrink-0 text-leaf-300" />
                <span>
                  {site.contact.address}<br />
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between gap-3 sm:gap-4 text-xs text-cream/50 relative z-10">
          <p>© {year} {site.fullName}. Todos los derechos reservados.</p>
          <p>Hecho con cariño en Uruguay.</p>
        </div>
      </Container>

      {/* Watermark "Ñapinda" decorativo. Clamp más conservador en mobile. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center select-none"
      >
        <span
          className="font-display font-medium leading-[0.8] tracking-tight text-leaf-300/[0.07] whitespace-nowrap"
          style={{
            fontSize: 'clamp(5rem, 28vw, 24rem)',
            transform: 'translateY(20%)',
          }}
        >
          Ñapinda
        </span>
      </div>
    </footer>
  )
}

import { Link } from 'react-router-dom'
import Container from '../components/ui/Container'
import Icon from '../components/ui/Icon'

export default function NotFoundPage() {
  return (
    <Container className="min-h-[80vh] flex flex-col items-center justify-center text-center pt-32 pb-20">
      <p className="text-leaf-600 text-xs font-medium tracking-[0.2em] uppercase mb-4">
        Error 404
      </p>
      <h1 className="font-display text-5xl md:text-6xl">
        Esta página no creció todavía.
      </h1>
      <p className="mt-5 max-w-md text-ink-soft leading-relaxed">
        Es posible que la dirección esté equivocada o que el contenido se haya
        movido. Volvé al inicio para seguir explorando.
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex items-center justify-center gap-2 font-medium rounded-full bg-forest-500 text-cream hover:bg-forest-600 transition-colors text-base px-7 py-3.5"
      >
        Volver al inicio
        <Icon name="arrowRight" className="w-4 h-4" />
      </Link>
    </Container>
  )
}

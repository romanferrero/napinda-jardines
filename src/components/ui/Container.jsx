/**
 * Contenedor centrado con padding horizontal responsivo.
 * Uso: <Container as="section" className="py-24">...</Container>
 */
export default function Container({ as: As = 'div', className = '', children, ...rest }) {
  return (
    <As
      className={`mx-auto w-full max-w-7xl container-px ${className}`}
      {...rest}
    >
      {children}
    </As>
  )
}

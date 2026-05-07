import { motion, AnimatePresence } from 'framer-motion'
import { site } from '../data/site'
import useContactForm from '../hooks/useContactForm'
import Container from '../components/ui/Container'
import SectionTitle from '../components/ui/SectionTitle'
import FadeIn from '../components/ui/FadeIn'
import Icon from '../components/ui/Icon'
import Button from '../components/ui/Button'

/**
 * Sección Contacto: información a la izquierda, formulario validado a la derecha.
 */
export default function Contact() {
  const {
    values,
    errors,
    status,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  } = useContactForm()

  const fieldClass = (field) =>
    `w-full px-4 py-3 bg-cream/5 border rounded-xl text-cream placeholder:text-cream/40 focus:outline-none focus:ring-2 focus:ring-leaf-300 focus:border-leaf-300 transition-colors ${touched[field] && errors[field] ? 'border-terra-300' : 'border-cream/15'
    }`

  return (
    <section id="contacto" className="py-24 md:py-32 bg-forest-700 text-cream">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionTitle
              eyebrow="Contacto"
              title="Empecemos a imaginar tu jardín."
              subtitle="Ya sea un jardín, una terraza, un interior o un espacio a renovar, contanos qué necesitás. Te responderemos para acompañarte desde las primeras ideas."
              light
            />

            <div className="mt-12 space-y-7">
              <ContactItem
                icon="whatsapp"
                title="WhatsApp"
                value={`${site.contact.phone}   ·   ${site.contact.phoneTwo}`}
                href={`${site.contact.whatsappHref}   ·   ${site.contact.whatsappHrefTwo}`}
                external
              />
              <ContactItem
                icon="mail"
                title="Email"
                value={site.contact.email}
                href={site.contact.emailHref}
              />
              <ContactItem
                icon="mapPin"
                title="Ubicación"
                value={site.contact.address}
              />
            </div>
          </div>

          <FadeIn className="lg:col-span-7" delay={0.1}>
            <div className="rounded-3xl bg-forest-800 p-7 md:p-10 border border-cream/10">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10"
                  >
                    <div className="w-14 h-14 mx-auto rounded-full bg-leaf-300/20 text-leaf-200 flex items-center justify-center">
                      <Icon name="check" className="w-7 h-7" strokeWidth={2.2} />
                    </div>
                    <h3 className="font-display text-2xl mt-6 text-cream">¡Gracias!</h3>
                    <p className="mt-3 text-cream/70 max-w-sm mx-auto">
                      Recibimos tu mensaje. Te vamos a estar contestando dentro
                      de las próximas 24 horas hábiles.
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-8 text-sm text-leaf-200 hover:text-cream underline underline-offset-4"
                    >
                      Enviar otro mensaje
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Field
                        label="Nombre"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && errors.name}
                        className={fieldClass('name')}
                        autoComplete="name"
                      />
                      <Field
                        label="Email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && errors.email}
                        className={fieldClass('email')}
                        autoComplete="email"
                      />
                    </div>

                    <Field
                      label="Teléfono (opcional)"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={fieldClass('phone')}
                      autoComplete="tel"
                    />

                    <Field
                      as="textarea"
                      label="Contanos sobre tu proyecto"
                      name="message"
                      rows={5}
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.message && errors.message}
                      className={`${fieldClass('message')} resize-y min-h-32`}
                    />

                    <div className="pt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <p className="text-xs text-cream/50">
                        Respondemos en menos de 24 hs hábiles.
                      </p>
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={status === 'sending'}
                        className="bg-leaf-300 text-forest-800 hover:bg-leaf-200 disabled:opacity-60 disabled:cursor-wait"
                      >
                        {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
                        {status !== 'sending' && (
                          <Icon name="arrowRight" className="w-4 h-4" />
                        )}
                      </Button>
                    </div>

                    {status === 'error' && (
                      <p className="text-sm text-terra-200">
                        Algo salió mal. Probá nuevamente o escribinos por WhatsApp.
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}

function ContactItem({ icon, title, value, href, external }) {
  const inner = (
    <>
      <div className="w-11 h-11 rounded-full bg-cream/10 text-leaf-200 flex items-center justify-center flex-shrink-0">
        <Icon name={icon} className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-cream/50 mb-1">{title}</p>
        <p className="text-cream">{value}</p>
      </div>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="flex items-start gap-4 hover:opacity-90 transition-opacity"
      >
        {inner}
      </a>
    )
  }
  return <div className="flex items-start gap-4">{inner}</div>
}

function Field({ as: As = 'input', label, name, error, className, ...rest }) {
  return (
    <label className="block">
      <span className="block text-sm text-cream/70 mb-2">{label}</span>
      <As id={name} name={name} className={className} {...rest} />
      {error && (
        <span className="block text-xs text-terra-200 mt-1.5">{error}</span>
      )}
    </label>
  )
}

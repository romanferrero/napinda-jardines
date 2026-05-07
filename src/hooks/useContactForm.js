import { useState } from 'react'

/**
 * Hook simple de formulario con validación.
 * Reemplazar `simulateSubmit` por integración con backend / Formspree / EmailJS.
 */

const initial = { name: '', email: '', phone: '', message: '' }
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Necesitamos tu nombre.'
  if (!values.email.trim()) errors.email = 'Dejanos un email para responderte.'
  else if (!emailRegex.test(values.email)) errors.email = 'El email no parece válido.'
  if (!values.message.trim() || values.message.trim().length < 10)
    errors.message = 'Contanos un poco más (mínimo 10 caracteres).'
  return errors
}

async function simulateSubmit(values) {
  await new Promise((r) => setTimeout(r, 900))
  // eslint-disable-next-line no-console
  console.info('[Ñapinda] Mensaje recibido:', values)
  return { ok: true }
}

export default function useContactForm() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (touched[name]) {
      setErrors(validate({ ...values, [name]: value }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors(validate(values))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate(values)
    setErrors(v)
    setTouched({ name: true, email: true, message: true })
    if (Object.keys(v).length > 0) return

    setStatus('sending')
    try {
      const res = await simulateSubmit(values)
      if (res.ok) {
        setStatus('success')
        setValues(initial)
        setTouched({})
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setStatus('idle')
    setValues(initial)
    setErrors({})
    setTouched({})
  }

  return { values, errors, status, touched, handleChange, handleBlur, handleSubmit, reset }
}

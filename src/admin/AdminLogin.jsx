import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch {
      setError('Email o contraseña incorrectos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8"
      >
        <h1 className="font-display text-2xl text-forest-800 text-center mb-1">
          Ñapinda
        </h1>
        <p className="text-ink-mute text-sm text-center mb-8">
          Panel de administración
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm text-center">
            {error}
          </div>
        )}

        <label className="block mb-4">
          <span className="text-sm font-medium text-ink-soft mb-1 block">
            Email
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-leaf-200 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf-400 text-base"
            placeholder="tu@email.com"
          />
        </label>

        <label className="block mb-6">
          <span className="text-sm font-medium text-ink-soft mb-1 block">
            Contraseña
          </span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-leaf-200 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf-400 text-base"
            placeholder="••••••••"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-forest-600 hover:bg-forest-700 text-cream font-semibold text-base transition-colors disabled:opacity-50"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}

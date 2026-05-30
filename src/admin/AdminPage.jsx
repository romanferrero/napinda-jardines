import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

/**
 * Página /admin.
 * Muestra login si no hay sesión, o el dashboard si hay sesión activa.
 */
export default function AdminPage() {
  const [user, setUser] = useState(undefined) // undefined = loading

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u))
  }, [])

  // Loading
  if (user === undefined) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-ink-mute">Cargando...</p>
      </div>
    )
  }

  return user ? <AdminDashboard /> : <AdminLogin />
}

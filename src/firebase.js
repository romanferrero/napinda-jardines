/**
 * Configuración de Firebase.
 *
 * IMPORTANTE: Antes de usar el admin, creá un proyecto en https://console.firebase.google.com
 * y reemplazá estos valores con los de tu proyecto.
 *
 * Servicios necesarios:
 * 1. Authentication → Email/Password habilitado
 * 2. Firestore Database → creada en modo producción
 * 3. Storage → habilitado
 *
 * Creá un usuario admin desde la consola de Firebase:
 *   Authentication → Add user → email + contraseña
 */

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY || 'TU_API_KEY',
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN || 'tu-proyecto.firebaseapp.com',
  projectId: import.meta.env.VITE_FB_PROJECT_ID || 'tu-proyecto',
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET || 'tu-proyecto.appspot.com',
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_ID || '000000000000',
  appId: import.meta.env.VITE_FB_APP_ID || '1:000:web:000',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app

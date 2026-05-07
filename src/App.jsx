import { Routes, Route } from 'react-router-dom'
import SiteLayout from './layouts/SiteLayout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import useScrollToHash from './hooks/useScrollToHash'

/**
 * Definicion de rutas. Hoy todo el contenido vive en HomePage,
 * pero la estructura ya soporta agregar paginas independientes
 * (ej: /servicios/diseno, /blog/...) sin reescribir nada.
 */
function App() {
  useScrollToHash()

  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App

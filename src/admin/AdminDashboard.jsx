import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useGallery } from '../context/GalleryContext'
import ProjectEditor from './ProjectEditor'

export default function AdminDashboard() {
  const { projects, loading, removeProject } = useGallery()
  const [editing, setEditing] = useState(null) // null = list, 'new' = nuevo, project = editar
  const [confirmTarget, setConfirmTarget] = useState(null) // proyecto a eliminar
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-ink-mute text-lg">Cargando proyectos...</p>
      </div>
    )
  }

  // Si estamos editando, mostrar el editor
  if (editing !== null) {
    return (
      <ProjectEditor
        project={editing === 'new' ? null : editing}
        onClose={() => setEditing(null)}
      />
    )
  }

  async function handleConfirmDelete() {
    if (!confirmTarget) return
    setDeleting(true)
    setDeleteError('')
    try {
      await removeProject(confirmTarget)
      setConfirmTarget(null)
    } catch {
      setDeleteError('No se pudo eliminar el proyecto. Intentá de nuevo.')
    } finally {
      setDeleting(false)
    }
  }

  function closeConfirm() {
    if (deleting) return
    setConfirmTarget(null)
    setDeleteError('')
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white border-b border-leaf-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl text-forest-800">
              Galería de proyectos
            </h1>
            <p className="text-xs text-ink-mute mt-0.5">
              {projects.length} proyecto{projects.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEditing('new')}
              className="px-5 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-cream font-semibold text-sm transition-colors"
            >
              + Nuevo proyecto
            </button>
            <button
              onClick={() => signOut(auth)}
              className="px-4 py-2.5 rounded-xl border border-leaf-200 text-ink-mute hover:bg-leaf-50 text-sm transition-colors"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* Project cards */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-ink-mute text-lg mb-4">
              No hay proyectos todavía
            </p>
            <button
              onClick={() => setEditing('new')}
              className="px-6 py-3 rounded-xl bg-forest-600 hover:bg-forest-700 text-cream font-semibold transition-colors"
            >
              Agregar el primero
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <div
                key={project._docId || project.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Cover image */}
                <div className="aspect-[4/3] bg-leaf-50 relative overflow-hidden">
                  {project.cover ? (
                    <img
                      src={project.cover}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-ink-mute">
                      Sin foto
                    </div>
                  )}
                  <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-forest-900/60 text-cream text-xs">
                    {(project.photos || []).length} fotos
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-xs text-leaf-600 uppercase tracking-wide mb-1">
                    {project.category}
                  </p>
                  <h3 className="font-display text-lg text-forest-800 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-ink-mute mt-1">
                    {project.location} · {project.year}
                  </p>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setEditing(project)}
                      className="flex-1 py-2 rounded-lg bg-leaf-50 hover:bg-leaf-100 text-forest-700 font-medium text-sm transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        setDeleteError('')
                        setConfirmTarget(project)
                      }}
                      className="py-2 px-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-sm transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal de confirmación de borrado */}
      <AnimatePresence>
        {confirmTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-forest-900/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeConfirm}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-full bg-red-50 flex items-center justify-center text-red-500 text-xl">
                  🗑️
                </div>
                <div className="min-w-0">
                  <h2 className="font-display text-lg text-forest-800">
                    Eliminar proyecto
                  </h2>
                  <p className="text-sm text-ink-mute mt-1">
                    ¿Seguro que querés eliminar{' '}
                    <span className="font-semibold text-ink">
                      “{confirmTarget.title}”
                    </span>
                    ? También se borrarán sus fotos. Esta acción no se puede
                    deshacer.
                  </p>
                </div>
              </div>

              {deleteError && (
                <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
                  {deleteError}
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button
                  onClick={closeConfirm}
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl border border-leaf-200 text-ink-soft hover:bg-leaf-50 font-medium text-sm transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors disabled:opacity-50"
                >
                  {deleting ? 'Eliminando...' : 'Sí, eliminar'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

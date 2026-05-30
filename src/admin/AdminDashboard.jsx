import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useGallery } from '../context/GalleryContext'
import ProjectEditor from './ProjectEditor'

export default function AdminDashboard() {
  const { projects, loading, removeProject } = useGallery()
  const [editing, setEditing] = useState(null) // null = list, 'new' = nuevo, project = editar
  const [deleting, setDeleting] = useState(null)

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

  async function handleDelete(project) {
    setDeleting(project.id)
    try {
      await removeProject(project)
    } catch {
      alert('Error al eliminar el proyecto')
    } finally {
      setDeleting(null)
    }
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
                key={project.id || project._docId}
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
                        if (
                          window.confirm(
                            `¿Segura que querés eliminar "${project.title}"?`
                          )
                        ) {
                          handleDelete(project)
                        }
                      }}
                      disabled={deleting === project.id}
                      className="py-2 px-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-sm transition-colors disabled:opacity-50"
                    >
                      {deleting === project.id ? '...' : 'Eliminar'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

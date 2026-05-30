import { useState, useRef } from 'react'
import { useGallery } from '../context/GalleryContext'

const CATEGORIES = [
  'Diseño',
  'Construcción',
  'Mantenimiento integral',
  'Diseño + Construcción',
  'Construcción + Riego',
  'Construcción + Asesoría',
]

const ASPECT_OPTIONS = [
  { value: '4/3', label: 'Horizontal' },
  { value: '1/1', label: 'Cuadrada' },
  { value: '4/5', label: 'Vertical' },
  { value: '3/4', label: 'Vertical alta' },
]

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function ProjectEditor({ project, onClose }) {
  const { uploadPhoto, saveProject } = useGallery()
  const fileInputRef = useRef(null)

  const isNew = !project

  const [form, setForm] = useState({
    id: project?.id || '',
    title: project?.title || '',
    category: project?.category || CATEGORIES[0],
    location: project?.location || '',
    year: project?.year || new Date().getFullYear(),
    description: project?.description || '',
    cover: project?.cover || '',
    aspect: project?.aspect || '4/3',
    photos: project?.photos || [],
    order: project?.order ?? 0,
    _docId: project?._docId || undefined,
  })

  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')

  function updateField(field, value) {
    setForm((prev) => {
      const next = { ...prev, [field]: value }
      // Auto-generar ID del título si es nuevo
      if (field === 'title' && isNew) {
        next.id = slugify(value)
      }
      return next
    })
  }

  async function handlePhotoUpload(e) {
    const files = Array.from(e.target.files)
    if (!files.length) return

    setUploading(true)
    const newPhotos = [...form.photos]

    for (let i = 0; i < files.length; i++) {
      setUploadProgress(`Subiendo foto ${i + 1} de ${files.length}...`)
      try {
        const url = await uploadPhoto(files[i], form.id || 'temp')
        newPhotos.push(url)
      } catch (err) {
        alert(`Error subiendo ${files[i].name}: ${err.message}`)
      }
    }

    // Si no hay cover, usar la primera foto
    const cover = form.cover || newPhotos[0] || ''

    setForm((prev) => ({ ...prev, photos: newPhotos, cover }))
    setUploading(false)
    setUploadProgress('')

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function removePhoto(index) {
    setForm((prev) => {
      const photos = prev.photos.filter((_, i) => i !== index)
      const cover =
        prev.cover === prev.photos[index] ? photos[0] || '' : prev.cover
      return { ...prev, photos, cover }
    })
  }

  function setCover(url) {
    setForm((prev) => ({ ...prev, cover: url }))
  }

  async function handleSave() {
    if (!form.title.trim()) {
      alert('Ponele un título al proyecto')
      return
    }
    if (!form.photos.length) {
      alert('Agregá al menos una foto')
      return
    }

    setSaving(true)
    try {
      await saveProject(form)
      onClose()
    } catch (err) {
      alert('Error al guardar: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white border-b border-leaf-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-ink-mute hover:text-ink text-sm flex items-center gap-1"
          >
            ← Volver
          </button>
          <h1 className="font-display text-lg text-forest-800">
            {isNew ? 'Nuevo proyecto' : 'Editar proyecto'}
          </h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-forest-600 hover:bg-forest-700 text-cream font-semibold text-sm transition-colors disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Datos básicos */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-display text-lg text-forest-800 mb-5">
            Datos del proyecto
          </h2>

          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-ink-soft mb-1 block">
                Título del proyecto *
              </span>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Ej: Jardín en Carrasco"
                className="w-full px-4 py-3 rounded-xl border border-leaf-200 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf-400 text-base"
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-ink-soft mb-1 block">
                  Categoría
                </span>
                <select
                  value={form.category}
                  onChange={(e) => updateField('category', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-leaf-200 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf-400 text-base"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-ink-soft mb-1 block">
                  Ubicación
                </span>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  placeholder="Ej: Pocitos, Montevideo"
                  className="w-full px-4 py-3 rounded-xl border border-leaf-200 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf-400 text-base"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-ink-soft mb-1 block">
                  Año
                </span>
                <input
                  type="number"
                  value={form.year}
                  onChange={(e) =>
                    updateField('year', parseInt(e.target.value) || 2024)
                  }
                  min="2000"
                  max="2030"
                  className="w-full px-4 py-3 rounded-xl border border-leaf-200 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf-400 text-base"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-ink-soft mb-1 block">
                  Forma de la tarjeta
                </span>
                <select
                  value={form.aspect}
                  onChange={(e) => updateField('aspect', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-leaf-200 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf-400 text-base"
                >
                  {ASPECT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-ink-soft mb-1 block">
                Descripción
              </span>
              <textarea
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={3}
                placeholder="Contá un poco sobre el proyecto..."
                className="w-full px-4 py-3 rounded-xl border border-leaf-200 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf-400 text-base resize-y"
              />
            </label>
          </div>
        </section>

        {/* Fotos */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-display text-lg text-forest-800 mb-2">
            Fotos del proyecto
          </h2>
          <p className="text-sm text-ink-mute mb-5">
            Hacé clic en una foto para elegirla como portada. La portada es la
            que se muestra en la galería principal.
          </p>

          {/* Upload button */}
          <div className="mb-5">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-dashed border-leaf-300 text-forest-700 font-medium text-sm cursor-pointer hover:bg-leaf-50 transition-colors ${
                uploading ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              {uploading ? uploadProgress : '📷 Agregar fotos'}
            </label>
          </div>

          {/* Photo grid */}
          {form.photos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {form.photos.map((url, i) => (
                <div
                  key={i}
                  className={`relative group aspect-square rounded-xl overflow-hidden cursor-pointer ring-2 ${
                    url === form.cover
                      ? 'ring-leaf-500 ring-offset-2'
                      : 'ring-transparent hover:ring-leaf-300'
                  }`}
                  onClick={() => setCover(url)}
                >
                  <img
                    src={url}
                    alt={`Foto ${i + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {url === form.cover && (
                    <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-leaf-600 text-cream text-[10px] font-bold uppercase tracking-wider">
                      Portada
                    </div>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removePhoto(i)
                    }}
                    className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-red-500/80 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold"
                    title="Quitar foto"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-ink-mute text-sm border-2 border-dashed border-leaf-200 rounded-xl">
              Todavía no hay fotos. Usá el botón de arriba para agregar.
            </div>
          )}
        </section>

        {/* Botón guardar (fijo abajo en mobile) */}
        <div className="sm:hidden fixed bottom-0 inset-x-0 p-4 bg-white border-t border-leaf-100">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 rounded-xl bg-forest-600 hover:bg-forest-700 text-cream font-semibold text-base transition-colors disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar proyecto'}
          </button>
        </div>
      </main>
    </div>
  )
}

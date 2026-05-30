import { createContext, useContext, useState, useEffect } from 'react'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
} from 'firebase/firestore'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { db, storage } from '../firebase'
import { gallery as fallbackGallery } from '../data/gallery'

const GalleryContext = createContext(null)

export function useGallery() {
  return useContext(GalleryContext)
}

/**
 * Lee la galería desde Firestore. Si Firestore está vacío o falla
 * (ej: Firebase no configurado), usa los datos hardcodeados como fallback.
 */
export function GalleryProvider({ children }) {
  const [projects, setProjects] = useState(fallbackGallery)
  const [loading, setLoading] = useState(true)
  const [usingFirebase, setUsingFirebase] = useState(false)

  // Carga inicial
  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    try {
      const q = query(collection(db, 'gallery'), orderBy('order', 'asc'))
      const snap = await getDocs(q)
      if (!snap.empty) {
        const data = snap.docs.map((d) => ({ ...d.data(), _docId: d.id }))
        setProjects(data)
        setUsingFirebase(true)
      }
    } catch {
      // Firebase no configurado o sin datos — usa fallback
    } finally {
      setLoading(false)
    }
  }

  async function uploadPhoto(file, projectId) {
    const name = `gallery/${projectId}/${Date.now()}-${file.name}`
    const storageRef = ref(storage, name)
    await uploadBytes(storageRef, file)
    return getDownloadURL(storageRef)
  }

  async function deletePhoto(url) {
    try {
      const storageRef = ref(storage, url)
      await deleteObject(storageRef)
    } catch {
      // Puede fallar si es una URL externa (Unsplash, etc.)
    }
  }

  async function saveProject(project) {
    const { _docId, ...data } = project

    if (_docId) {
      // Actualizar existente
      const docRef = doc(db, 'gallery', _docId)
      await updateDoc(docRef, data)
    } else {
      // Crear nuevo
      data.order = projects.length
      await addDoc(collection(db, 'gallery'), data)
    }

    await fetchProjects()
  }

  async function removeProject(project) {
    if (!project._docId) return

    // Borrar fotos del storage
    for (const url of project.photos || []) {
      await deletePhoto(url)
    }
    if (project.cover) await deletePhoto(project.cover)

    await deleteDoc(doc(db, 'gallery', project._docId))
    await fetchProjects()
  }

  async function reorderProjects(reorderedList) {
    const batch = reorderedList.map((p, i) => {
      if (!p._docId) return null
      return updateDoc(doc(db, 'gallery', p._docId), { order: i })
    })
    await Promise.all(batch.filter(Boolean))
    await fetchProjects()
  }

  return (
    <GalleryContext.Provider
      value={{
        projects,
        loading,
        usingFirebase,
        uploadPhoto,
        saveProject,
        removeProject,
        reorderProjects,
        refresh: fetchProjects,
      }}
    >
      {children}
    </GalleryContext.Provider>
  )
}

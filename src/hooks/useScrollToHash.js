import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'


export default function useScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 80)
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [hash, pathname])
}

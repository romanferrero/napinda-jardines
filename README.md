# Ñapinda Jardines

Sitio web de Ñapinda Jardines — diseño, construcción y mantenimiento de
jardines en Uruguay. SPA construida con React + Vite + Tailwind CSS.

## Stack

- **React 19** + **Vite 8** — bundler y dev server
- **Tailwind CSS v4** — sistema de diseño con tokens en `src/index.css`
- **React Router v7** — soporte multi-ruta listo para crecer
- **Framer Motion** — animaciones de entrada y transiciones

## Comandos

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción a dist/
npm run preview  # previsualizar el build
npm run lint     # eslint
```

## Estructura

```
src/
  components/
    layout/      → Navbar, Footer
    ui/          → Container, Button, FadeIn, SectionTitle, Logo, Icon
  data/          → contenido editable: site, services, gallery, values
  hooks/         → useContactForm, useScrollToHash
  layouts/       → SiteLayout (Navbar + Outlet + Footer)
  pages/         → HomePage, NotFoundPage
  sections/      → Hero, About, Services, Gallery, Contact, WhatsAppFAB
  App.jsx        → definición de rutas
  main.jsx       → entry point con BrowserRouter
  index.css      → tokens de diseño + Tailwind
```

## Cómo personalizar

**Contenido de la empresa, contacto y redes** → editar `src/data/site.js`.

**Servicios** → agregar/editar items en `src/data/services.js`. El campo
`icon` referencia un nombre del set en `src/components/ui/Icon.jsx`.

**Galería** → reemplazar URLs de Unsplash en `src/data/gallery.js` por
fotos reales subidas a `public/gallery/` o un CDN.

**Paleta y tipografías** → tokens CSS en `src/index.css` bajo `@theme`.
Cambiar un token actualiza toda la app sin refactor.

**Formulario de contacto** → `src/hooks/useContactForm.js`. Reemplazar
`simulateSubmit` por una llamada `fetch` al backend, Formspree o EmailJS.

## Próximos pasos sugeridos

- Conectar formulario a backend real (Formspree, Resend, EmailJS).
- Subir fotos propias a `public/gallery/` y reemplazar las de Unsplash.
- Agregar `react-helmet-async` para SEO por ruta cuando se sumen páginas.
- Configurar deploy en Vercel / Netlify / Cloudflare Pages.

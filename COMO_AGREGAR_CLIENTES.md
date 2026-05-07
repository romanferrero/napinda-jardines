# Cómo agregar la sección Clientes

Esta guía te muestra el flujo completo para crear una sección nueva en el sitio,
usando "Clientes" como ejemplo. El mismo patrón sirve para cualquier sección
que quieras agregar después (Testimonios, Blog, Premios, etc.).

El proyecto está pensado para que cada sección sea **3 archivos**:

```
src/data/<algo>.js          ← contenido (lo que cambia más seguido)
src/sections/<Algo>.jsx     ← cómo se ve esa sección
src/pages/HomePage.jsx      ← le decimos en qué orden aparece
```

---

## Paso 1 · Crear los datos

Creá el archivo `src/data/clients.js` con el siguiente contenido. Cada cliente
es un objeto con `id`, `name` (para el alt) y `logo` (path a la imagen):

```js
// src/data/clients.js
/**
 * Logos de clientes / empresas que confiaron en Ñapinda.
 * Subí las imágenes a /public/clients/ y referencialas como
 * /clients/<archivo>.svg (sin el "public/").
 *
 * Idealmente usar SVG (escalan perfecto) o PNG con fondo transparente.
 */
export const clients = [
  { id: 'cliente-1', name: 'Cliente 1', logo: '/clients/cliente-1.svg' },
  { id: 'cliente-2', name: 'Cliente 2', logo: '/clients/cliente-2.svg' },
  { id: 'cliente-3', name: 'Cliente 3', logo: '/clients/cliente-3.svg' },
  { id: 'cliente-4', name: 'Cliente 4', logo: '/clients/cliente-4.svg' },
  { id: 'cliente-5', name: 'Cliente 5', logo: '/clients/cliente-5.svg' },
  { id: 'cliente-6', name: 'Cliente 6', logo: '/clients/cliente-6.svg' },
]
```

Después creá la carpeta `public/clients/` y poné ahí los archivos de logo
con esos mismos nombres. Si todavía no los tenés, dejá la lista vacía
(`export const clients = []`) y la sección se va a auto-ocultar (ver paso 2).

---

## Paso 2 · Crear el componente de la sección

Creá el archivo `src/sections/Clients.jsx`:

```jsx
// src/sections/Clients.jsx
import { clients } from '../data/clients'
import Container from '../components/ui/Container'
import SectionTitle from '../components/ui/SectionTitle'
import FadeIn from '../components/ui/FadeIn'

/**
 * Sección Clientes — grid de logos en escala de grises que toman color
 * al hacer hover. Si no hay clientes en data/clients.js, no se renderiza.
 */
export default function Clients() {
  if (!clients.length) return null

  return (
    <section id="clientes" className="py-20 md:py-24 bg-cream">
      <Container>
        <SectionTitle
          eyebrow="Clientes"
          title="Confiaron en nosotros."
          subtitle="Empresas, estudios e instituciones con las que trabajamos."
          align="center"
          className="mx-auto"
        />

        <FadeIn className="mt-12 md:mt-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10 items-center">
            {clients.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-center"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  loading="lazy"
                  className="max-h-12 md:max-h-14 w-auto opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
```

**Qué hace este código, en una línea:** muestra un grid de logos sutiles
(grayscale + opacidad reducida) que se "iluminan" al pasar el mouse.

---

## Paso 3 · Sumar la sección al Home

Editá `src/pages/HomePage.jsx` y agregá el import + el componente donde
quieras que aparezca. Por ejemplo, entre `Gallery` y `Contact`:

```jsx
import Hero from '../sections/Hero'
import About from '../sections/About'
import Team from '../sections/Team'
import Services from '../sections/Services'
import Gallery from '../sections/Gallery'
import Clients from '../sections/Clients'   // ← NUEVO
import Contact from '../sections/Contact'
import WhatsAppFAB from '../sections/WhatsAppFAB'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Team />
      <Services />
      <Gallery />
      <Clients />              {/* ← NUEVO */}
      <Contact />
      <WhatsAppFAB />
    </>
  )
}
```

---

## Paso 4 (opcional) · Agregar al menú

Si querés un link directo a la sección desde la navbar, editá
`src/data/site.js` y agregá un item al array `nav`:

```js
nav: [
  { label: 'Inicio',     href: '/' },
  { label: 'Nosotros',   href: '/#nosotros' },
  { label: 'Equipo',     href: '/#equipo' },
  { label: 'Servicios',  href: '/#servicios' },
  { label: 'Galería',    href: '/#galeria' },
  { label: 'Clientes',   href: '/#clientes' },   // ← NUEVO
  { label: 'Contacto',   href: '/#contacto' },
],
```

El `href` tiene que coincidir con el `id="clientes"` que pusimos en la sección.

---

## Paso 5 · Probar

```bash
npm run dev
```

Abrí http://localhost:5173 y deberías ver la sección. Si no se renderiza:

- ¿Hay items en `clients` en `data/clients.js`?
- ¿Las imágenes existen en `public/clients/`?
- ¿El `id` de la sección coincide con el `href` del nav?

---

## Patrón general (para futuras secciones)

Es **siempre** el mismo flujo:

1. **Datos** → `src/data/<nombre>.js` (export con array u objeto)
2. **Componente** → `src/sections/<Nombre>.jsx` (importa los datos y los pinta)
3. **Mostrarlo** → `src/pages/HomePage.jsx` (importar y agregar)
4. **Menú** (opcional) → `src/data/site.js` (agregar al array `nav`)

Tip: los componentes UI que ya están listos te ahorran trabajo:
- `<Container>` para el max-width + padding
- `<SectionTitle>` para el header con eyebrow + título + subtítulo
- `<FadeIn>` para envolver bloques que aparecen al scrollear
- `<Icon name="..." />` para iconos del set

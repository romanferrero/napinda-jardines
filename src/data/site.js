/**
 * Información general del sitio.
 * Modificá este archivo para actualizar copy, contacto y redes
 * sin tener que tocar componentes.
 */

export const site = {
  name: 'Ñapinda',
  fullName: 'Ñapinda Jardines',
  tagline: 'Diseño, construcción y mantenimiento de jardines',
  shortPitch:
    'Creamos espacios verdes con identidad propia, pensados para vivirse y cuidarse en el tiempo.',
  longPitch:
    'Hace más de 15 años diseñamos y mantenemos jardines en Uruguay. Combinamos paisajismo, agronomía y oficio para que cada proyecto crezca sano y siga contando una historia con los años.',

  contact: {
    phone: '+598 99 000 000',
    phoneHref: 'tel:+59899000000',
    whatsapp: '59899000000',
    whatsappHref: 'https://wa.me/59899000000',
    email: 'hola@napinda.com.uy',
    emailHref: 'mailto:hola@napinda.com.uy',
    address: 'Montevideo, Uruguay',
    hours: 'Lunes a viernes · 9 a 18 hs',
  },

  social: {
    instagram: 'https://www.instagram.com/napindajardines',
    facebook: 'https://www.facebook.com/napindajardines',
  },

  nav: [
    { label: 'Inicio', href: '/' },
    { label: 'Nosotros', href: '/#nosotros' },
    { label: 'Equipo', href: '/#equipo' },
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Galería', href: '/#galeria' },
    { label: 'Contacto', href: '/#contacto' },
  ],
}

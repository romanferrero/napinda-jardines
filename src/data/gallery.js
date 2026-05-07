/**
 * Galería de proyectos.
 *
 * Cada proyecto tiene un cover (la foto destacada en el grid) y un array
 * `photos` con las fotos completas del álbum que se muestran al abrir el
 * lightbox. Reemplazá las URLs de Unsplash por fotos reales subidas a
 * /public/gallery/<slug>/01.jpg, 02.jpg, etc. cuando estén listas.
 *
 * Ejemplo con fotos propias:
 *   cover: '/gallery/patio-canelones/cover.jpg',
 *   photos: [
 *     '/gallery/patio-canelones/01.jpg',
 *     '/gallery/patio-canelones/02.jpg',
 *   ]
 */

const u = (id, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const gallery = [
  {
    id: 'patio-canelones',
    title: 'Patio en Canelones',
    category: 'Diseño + Construcción',
    location: 'Canelones',
    year: 2024,
    description:
      'Un patio chico transformado en un rincón íntimo: deck de madera, canteros con nativas y luz cálida indirecta para usarlo de noche.',
    cover: u('1558293842-c0fd3db86157'),
    aspect: '4/5',
    photos: [
      u('1558293842-c0fd3db86157'),
      u('1416879595882-3373a0480b5b'),
      u('1466692476868-aef1dfb1e735'),
      u('1505691938895-1758d7feb511'),
    ],
  },
  {
    id: 'jardin-trasero-carrasco',
    title: 'Jardín trasero · Carrasco',
    category: 'Mantenimiento integral',
    location: 'Carrasco, Montevideo',
    year: 2023,
    description:
      'Mantenimiento mensual de un jardín maduro: poda formativa, control fitosanitario y reposiciones estacionales.',
    cover: u('1416879595882-3373a0480b5b'),
    aspect: '1/1',
    photos: [
      u('1416879595882-3373a0480b5b'),
      u('1572979461698-0427d80fa83b'),
      u('1598532213005-76f6abc24a73'),
    ],
  },
  {
    id: 'parque-empresarial',
    title: 'Parque empresarial',
    category: 'Construcción',
    location: 'Zonamerica',
    year: 2024,
    description:
      'Espacio verde corporativo con caminos peatonales, bancos y especies de bajo mantenimiento adaptadas al uso intensivo.',
    cover: u('1585320806297-9794b3e4eeae'),
    aspect: '4/3',
    photos: [
      u('1585320806297-9794b3e4eeae'),
      u('1505691938895-1758d7feb511'),
      u('1572979461698-0427d80fa83b'),
      u('1598902108854-10e335adac99'),
    ],
  },
  {
    id: 'jardin-mediterraneo',
    title: 'Jardín mediterráneo',
    category: 'Diseño',
    location: 'Punta del Este',
    year: 2023,
    description:
      'Olivos, lavandas y romeros sobre suelo árido. Un jardín que se ve mejor cada año y casi no necesita riego.',
    cover: u('1598532213005-76f6abc24a73'),
    aspect: '4/5',
    photos: [
      u('1598532213005-76f6abc24a73'),
      u('1466692476868-aef1dfb1e735'),
      u('1572979461698-0427d80fa83b'),
    ],
  },
  {
    id: 'huerta-organica',
    title: 'Huerta orgánica',
    category: 'Construcción + Asesoría',
    location: 'La Floresta',
    year: 2024,
    description:
      'Huerta familiar con canteros elevados, compostera y plan de rotación de cultivos para todo el año.',
    cover: u('1592595896616-c37162298647'),
    aspect: '1/1',
    photos: [
      u('1592595896616-c37162298647'),
      u('1416879595882-3373a0480b5b'),
      u('1466692476868-aef1dfb1e735'),
    ],
  },
  {
    id: 'piscina-cesped',
    title: 'Borde de piscina',
    category: 'Construcción + Riego',
    location: 'La Tahona',
    year: 2024,
    description:
      'Reformulación del entorno de una piscina: césped en panes, palmeras enanas y riego automatizado por sectores.',
    cover: u('1505691938895-1758d7feb511'),
    aspect: '4/3',
    photos: [
      u('1505691938895-1758d7feb511'),
      u('1572979461698-0427d80fa83b'),
      u('1598902108854-10e335adac99'),
      u('1585320806297-9794b3e4eeae'),
    ],
  },
  {
    id: 'cantero-flores',
    title: 'Cantero de estación',
    category: 'Diseño',
    location: 'Pocitos',
    year: 2025,
    description:
      'Cantero longilíneo con floración escalonada para tener color durante toda la primavera y el verano.',
    cover: u('1466692476868-aef1dfb1e735'),
    aspect: '3/4',
    photos: [
      u('1466692476868-aef1dfb1e735'),
      u('1598532213005-76f6abc24a73'),
      u('1592595896616-c37162298647'),
    ],
  },
  {
    id: 'palmeras-deck',
    title: 'Deck con palmeras',
    category: 'Construcción',
    location: 'José Ignacio',
    year: 2023,
    description:
      'Deck de lapacho rodeado de palmeras pindó. Pensado para integrarse con la pradera del fondo.',
    cover: u('1572979461698-0427d80fa83b'),
    aspect: '4/3',
    photos: [
      u('1572979461698-0427d80fa83b'),
      u('1598902108854-10e335adac99'),
      u('1585320806297-9794b3e4eeae'),
    ],
  },
]

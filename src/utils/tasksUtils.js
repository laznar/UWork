import removeAccents from 'remove-accents';

const tasks = [
  // Mantenimiento del hogar:
  { name: 'Limpieza', popular: true },
  { name: 'Mensajería', popular: true },
  { name: 'Jardinería', popular: true },
  { name: 'Plomería/Fontanería', popular: true },
  { name: 'Electricidad', popular: true },
  { name: 'Mantenimiento de electrodomésticos' },
  { name: 'Cerrajería' },
  { name: 'Diseño Interior' },
  { name: 'Personal de mantenimiento' },
  { name: 'Contratación general (de…)' },
  { name: 'Piscinas' },
  { name: 'Instalación de electrodomésticos' },
  { name: 'Remodelación' },
  { name: 'Montajes' },
  { name: 'Asistencia y cuidado de personas' },
  { name: 'Servicio de mudanza' },
  { name: 'Construcción' },
  { name: 'Pintura interior' },
  { name: 'Control de plagas' },
  // BIenestar:
  { name: 'Entrenador personal' },
  { name: 'Terapia de masajes' },
  { name: 'Coaching' },
  { name: 'Yoga' },
  { name: 'Tratamiento facial' },
  { name: 'Consejería familiar' },
  // Mascotas:
  { name: 'Pasear perros' },
  { name: 'Cuidado de mascotas' },
  { name: 'Entrenamiento de mascotas' },
  { name: 'Alojamiento de mascotas' },
  // Negocios:
  { name: 'Contador' },
  { name: 'Reparación de Computadores' },
  { name: 'Reparación de móviles' },
  { name: 'Diseño' },
  { name: 'Reparación de redes' },
  { name: 'Consultoría jurídica' },
  { name: 'Modelado 3D' },
  { name: 'Traducción' },
  // Eventos:
  { name: 'Catering de eventos' },
  { name: 'Decoraciones' },
  { name: 'Fotógrafo' },
  { name: 'Hacer peinados' },
  { name: 'Maquillaje' },
  // Lecciones:
  { name: 'Clases de canto' },
  { name: 'Clases de tocar instrumento musical' },
  { name: 'Tutorías primaria' },
  { name: 'Tutorías bachillerato' },
  { name: 'Tutorías universitarias' },
  { name: 'Clases de inglés (idiomas)' },
  { name: 'Clases de ofimática' },
  { name: 'Clases de programación' },
  // Diseño y Web:
  { name: 'Diseño de logos' },
  { name: 'Diseño gráfico' },
  { name: 'Animación' },
  { name: 'Ilustración' },
  { name: 'Desarrollo de software' },
  // Legal:
  { name: 'Servicio de abogados' },
  { name: 'Mediación' },
  { name: 'Testamentos y planificación patrimonial' },
];

export const normalizeString = (s) => {
  return removeAccents(s.toLowerCase().replace(/ /g, ''));
};

export default tasks;

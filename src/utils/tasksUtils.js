import removeAccents from 'remove-accents';

const tasks = [
  { name: 'Limpieza', popular: true },
  { name: 'Mensajería', popular: true },
  { name: 'Jardinería', popular: true },
  { name: 'Plomería', popular: true },
  { name: 'Electricidad', popular: true },
  { name: 'Mantenimiento de electrodomésticos' },
  { name: 'Cerrajería' },
];

export const normalizeString = (s) => {
  return removeAccents(s.toLowerCase().replace(/ /g, ''));
};

export default tasks;

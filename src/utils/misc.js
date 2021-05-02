import removeAccents from 'remove-accents';

export const normalizeString = (s) => {
  return removeAccents(s.toLowerCase().replace(/ /g, ''));
};

const firebaseErrors = {
  auth: {
    emailAlreadyInUse: 'auth/email-already-in-use',
    userNotFound: 'auth/user-not-found',
    wrongPassword: 'auth/wrong-password',
  },
};

export const renderError = (code) => {
  switch (code) {
    case firebaseErrors.auth.emailAlreadyInUse:
      return 'Lo sentimos, este correo ya se encuentra registrado';
    case firebaseErrors.auth.userNotFound:
      return 'Esta cuenta no existe';
    case firebaseErrors.auth.wrongPassword:
      return 'Contraseña incorrecta';
    case 'auth/network-request-failed':
      return 'Error de red';
    default:
      return 'Ocurrió un error';
  }
};

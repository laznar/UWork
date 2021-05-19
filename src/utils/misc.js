import removeAccents from 'remove-accents';

export const normalizeString = (s) => {
  return removeAccents(s.toLowerCase().replace(/ /g, ''));
};

const firebaseErrors = {
  auth: {
    emailAlreadyInUse: 'auth/email-already-in-use',
    userNotFound: 'auth/user-not-found',
    wrongPassword: 'auth/wrong-password',
    networkRequestFailed: 'auth/network-request-failed',
    popupClosedByUser: 'auth/popup-closed-by-user',
    userMismatch: 'auth/user-mismatch'
  }
};

export const renderError = (code) => {
  switch (code) {
    case firebaseErrors.auth.emailAlreadyInUse:
      return 'Lo sentimos, este correo ya se encuentra registrado';
    case firebaseErrors.auth.userNotFound:
      return 'Esta cuenta no existe';
    case firebaseErrors.auth.wrongPassword:
      return 'Contraseña incorrecta';
    case firebaseErrors.auth.networkRequestFailed:
      return 'Error de red';
    case firebaseErrors.auth.popupClosedByUser:
      return 'Autenticación no finalizada';
    case firebaseErrors.auth.userMismatch:
      return 'Debes seleccionar la cuenta correcta';
    default:
      return 'Ocurrió un error';
  }
};

export const renderName = (name) => {
  return name ? name.split(' ')[0] : null;
};

export const renderInitials = (name) => {
  return name
    ? name
        .split(' ')
        .map((word) => word.slice(0, 1))
        .join('')[0]
    : null;
};

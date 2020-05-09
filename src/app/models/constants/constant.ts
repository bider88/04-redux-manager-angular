const ERROR_MESSAGES = {
  badEmail: 'The email address is badly formatted.',
  shortPassword: 'Password should be at least 6 characters'
};

export const AN_ERROR_HAS_OCURRED = 'Un error ha ocurrido';

export const firebaseMessages = (message) => {
  switch (message) {
    case ERROR_MESSAGES.badEmail:
      return 'El email ingresado no es válido';
    case ERROR_MESSAGES.shortPassword:
      return 'La contraseña debe ser de al menos 6 caracteres';
    default:
      return AN_ERROR_HAS_OCURRED;
  }
};

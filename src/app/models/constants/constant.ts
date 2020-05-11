const ERROR_MESSAGES = {
  badEmail: 'The email address is badly formatted.',
  shortPassword: 'Password should be at least 6 characters',
  invalidPassword: 'The password is invalid or the user does not have a password.',
  invalidUser: 'There is no user record corresponding to this identifier. The user may have been deleted.'
};

export const AN_ERROR_HAS_OCURRED = 'Un error ha ocurrido';
export const AN_ERROR_HAS_OCURRED_WHEN_WAS_PROCCESSED = 'Un error se ha generado al momento de procesar la información';
export const INVALID_EMAIL_AND_PASSWORD = 'El correo y/o la contraseña son incorrectas';
export const BAD_EMAIL = 'El email ingresado no tiene el formato válido';
export const SHORT_PASSWORD = 'La contraseña debe ser de al menos 6 caracteres';

export const firebaseMessages = (message) => {
  switch (message) {
    case ERROR_MESSAGES.badEmail:
      return BAD_EMAIL;
    case ERROR_MESSAGES.shortPassword:
      return SHORT_PASSWORD;
    case ERROR_MESSAGES.invalidPassword:
      return INVALID_EMAIL_AND_PASSWORD;
    case ERROR_MESSAGES.invalidUser:
      return INVALID_EMAIL_AND_PASSWORD;
    default:
      console.error('error: ', message);
      return AN_ERROR_HAS_OCURRED;
  }
};

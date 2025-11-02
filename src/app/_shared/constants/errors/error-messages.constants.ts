export const ERRORS = {
  userNotFound: 'auth/user-not-found',
  wrongPassword: 'auth/wrong-password'
};

export const ERROR_MESSAGES: Record<string, string> = {
  [ERRORS.userNotFound]: 'Incorrect email address or password. Please check your credentials and try again.',
  [ERRORS.wrongPassword]: 'Incorrect email address or password. Please check your credentials and try again.'
};

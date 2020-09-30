export const codes = {
  BAD_REQUEST: {
      code: 400,
      message: 'Bad request!'
  },
  ALREADY_REGISTERED: {
      code: 406,
      message: 'Email already registered'
  },
  SHORT_PASSWORD: {
      code: 400,
      internalCode: 40004,
      message: 'Password shorter then 4 characters'
  },
  WEEK_PASSWORD: {
      code: 400,
      internalCode: 40005,
      message: 'Password must contain at least one digit, one upper case letter, one special character and must be at least 8 characters long'
  },
  NOT_AUTHENTICATED: {
      code: 401,
      message: 'Not Authenticated'
  },
  FORBIDDEN: {
      code: 405,
      message: 'You are not authorized to access this URI'
  },
  EXPIRED: {
      code: 403,
      internalCode: 40403,
      message: 'Your session has expired'
  },
  EXPIRED_REFRESH_TOKEN: {
      code: 403,
      internalCode: 10,
      message: 'Your refresh token has expired, please re-login.'
  },
  NOT_FOUND: {
      code: 404,
      message: 'Not found'
  },
  NOT_ALLOWED: {
      code: 405,
      message: 'Not allowed'
  },
  DUPLICATE: {
      code: 406,
      message: 'Duplicate, already exists'
  },
  INVALID_EMAIL_PASSWORD: {
      code: 409,
      message: 'Invalid email/password'
  },
  INVALID_PASSWORD: {
      code: 409,
      message: 'Invalid password'
  },
  PASSWORDS_DONT_MATCH: {
      code: 409,
      message: 'Password and confirm password do not match'
  },
  INTERNAL_ERROR: {
      code: 500,
      message: 'Internal server error'
  },
  DATABASE_ERROR: {
      code: 500,
      message: 'Database error'
  },
  INTERNAL_ERROR_SENDING_EMAIL: {
      code: 500,
      message: 'Internal server error occurred while sending email'
  }
};
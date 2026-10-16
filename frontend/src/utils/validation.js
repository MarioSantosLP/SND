export const MIN_PASSWORD_LENGTH = 6
export const MAX_PASSWORD_LENGTH = 128

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(email) {
  const value = email.trim()
  if (!value) return 'Email is required.'
  if (!EMAIL_PATTERN.test(value)) return 'Enter a valid email address.'
  return ''
}

export function validateName(name) {
  const value = name.trim()
  if (!value) return 'Full name is required.'
  if (value.length < 2) return 'Name must be at least 2 characters.'
  if (value.length > 80) return 'Name must be 80 characters or fewer.'
  return ''
}

export function validateNewPassword(password) {
  if (!password) return 'Password is required.'
  if (password.length < MIN_PASSWORD_LENGTH)
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
  if (password.length > MAX_PASSWORD_LENGTH)
    return `Password must be ${MAX_PASSWORD_LENGTH} characters or fewer.`
  return ''
}

export function validateLogin({ email, password }) {
  return {
    email: validateEmail(email),
    password: password ? '' : 'Password is required.',
  }
}

export function validateSignup({ name, email, password, confirm }) {
  return {
    name: validateName(name),
    email: validateEmail(email),
    password: validateNewPassword(password),
    confirm: !confirm
      ? 'Please confirm your password.'
      : confirm !== password
        ? 'Passwords do not match.'
        : '',
  }
}

export const NETWORK_NAME_MAX_LENGTH = 60
export const NETWORK_DESCRIPTION_MAX_LENGTH = 300

export function validateNetwork({ name, description }) {
  const trimmed = name.trim()
  return {
    name: !trimmed
      ? 'Network name is required.'
      : trimmed.length > NETWORK_NAME_MAX_LENGTH
        ? `Name must be ${NETWORK_NAME_MAX_LENGTH} characters or fewer.`
        : '',
    description:
      description.length > NETWORK_DESCRIPTION_MAX_LENGTH
        ? `Description must be ${NETWORK_DESCRIPTION_MAX_LENGTH} characters or fewer.`
        : '',
  }
}

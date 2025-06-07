const validateUsername = (value: string): string | null => {
  if (value.length < 5 || value.length > 30) return 'Логин должен быть от 5 до 30 символов'
  if (!/^[a-zA-Z0-9_]+$/.test(value))
    return 'Логин должен содержать только латинские буквы, цифры и _'
  return null
}

const validateEmail = (value: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) return 'Введите корректный email'
  return null
}

const validatePhoneNumber = (value: string): string | null => {
  const digits = value.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 11) return 'Номер телефона должен содержать 10-11 цифр'
  if (!/^(\+7|7|8)?\d{10}$/.test(value) && !/^\d{10,11}$/.test(digits))
    return 'Введите корректный номер телефона'
  return null
}

const validateInn = (value: string): string | null => {
  if (value.length !== 10 && value.length !== 12) return 'ИНН должен содержать 10 или 12 цифр'
  if (!/^\d+$/.test(value)) return 'ИНН должен содержать только цифры'

  if (value.length === 10) {
    const coefficients = [2, 4, 10, 3, 5, 9, 4, 6, 8]
    const checkSum =
      (coefficients.reduce((acc, coef, i) => acc + coef * Number(value[i]), 0) % 11) % 10
    if (checkSum !== Number(value[9])) return 'ИНН невалиден'
  }

  if (value.length === 12) {
    const coefficients11 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]
    const checkSum11 =
      (coefficients11.reduce((acc, coef, i) => acc + coef * Number(value[i]), 0) % 11) % 10
    const coefficients12 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]
    const checkSum12 =
      (coefficients12.reduce((acc, coef, i) => acc + coef * Number(value[i]), 0) % 11) % 10
    if (checkSum11 !== Number(value[10]) || checkSum12 !== Number(value[11])) return 'ИНН невалиден'
  }
  return null
}

const validateCardNumber = (value: string): string | null => {
  const sanitized = value.replace(/\D/g, '')
  if (sanitized.length < 13 || sanitized.length > 19)
    return 'Номер карты должен содержать от 13 до 19 цифр'

  let sum = 0
  let shouldDouble = false
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized.charAt(i), 10)
    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
    shouldDouble = !shouldDouble
  }
  if (sum % 10 !== 0) return 'Номер карты невалиден'

  return null
}

const validateBankCode = (value: string): string | null => {
  if (value.length !== 9) return 'БИК должен содержать ровно 9 цифр'
  if (!/^\d{9}$/.test(value)) return 'БИК должен содержать только цифры'
  return null
}

export function validatePassword(value: string): string | null {
  if (value.length < 10 || value.length > 50) {
    return 'Ошибка значения, длина пароля должна быть от 10 до 50 символов'
  }
  return null
}
export const validateField = (name: string, value: string): string | null => {
  switch (name) {
    case 'username':
      return validateUsername(value)
    case 'email':
      return validateEmail(value)
    case 'phone_number':
      return validatePhoneNumber(value)
    case 'inn':
      return validateInn(value)
    case 'card_number':
      return validateCardNumber(value)
    case 'bank_code':
      return validateBankCode(value)
    case 'password':
      return validatePassword(value)
    default:
      return null
  }
}

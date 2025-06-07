export interface UserData {
  // User data
  username: string
  email: string
  name: string
  phone_number: string
  password: string
  // Financial data
  inn: string
  card_number: string
  bank_code: string
  bank_name: string
}

export interface AuthFormField {
  id: string
  label: string
  placeholder: string
  type?: string
}

import { useMutation } from '@tanstack/react-query'
import { getToken } from '../auth'

const registerUser = async (formData: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.detail || 'Ошибка при регистрации')
  }

  return res.json()
}

const loginUser = async (formData: { login: string; password: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.detail || 'Ошибка при входе')
  }

  return res.json() // probably returns JWT
}

export const getMe = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch user')
  }

  return res.json()
}

export const useRegister = () => useMutation({ mutationFn: registerUser })
export const useLogin = () => useMutation({ mutationFn: loginUser })

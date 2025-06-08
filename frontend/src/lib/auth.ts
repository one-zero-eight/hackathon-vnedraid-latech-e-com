import Cookies from 'js-cookie'

const TOKEN_KEY = 'token'

export const setToken = (token: string, refresh: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: 1 }) // Token expires in 7 days
  Cookies.set('refresh', refresh, { expires: 1 })
}

export const getToken = () => {
  return Cookies.get(TOKEN_KEY)
}
export const getRefesh = () => {
  return Cookies.get('refresh')
}

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY)
}

export const isAuthenticated = () => {
  return !!getToken()
}

export async function getUserIdFromToken(token: string): Promise<string | null> {
  try {
    const response = await fetch('/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      console.error(`Failed to fetch user info: ${response.status}`)
      return null
    }

    const data = await response.json()

    if (data && data.id) {
      return data.id
    } else {
      console.warn('No id field in response')
      return null
    }
  } catch (error) {
    console.error('Error fetching user info:', error)
    return null
  }
}

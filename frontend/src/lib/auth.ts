import Cookies from 'js-cookie'

const TOKEN_KEY = 'token'
const REFRESH_KEY = 'refresh'

export const setToken = (token: string, refresh: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: 1 })
  Cookies.set(REFRESH_KEY, refresh, { expires: 7 })
}

export const getAccessToken = () => Cookies.get(TOKEN_KEY)
export const getRefreshToken = () => Cookies.get(REFRESH_KEY)

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY)
  Cookies.remove(REFRESH_KEY)
}

export const isAuthenticated = () => !!getAccessToken()

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken()

  if (!refreshToken) {
    removeToken()
    return null
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken })
  })

  if (!res.ok) {
    removeToken()
    return null
  }

  const data = await res.json()
  setToken(data.access_token, refreshToken) // reuse old refresh token or use new one if returned
  return data.access_token
}

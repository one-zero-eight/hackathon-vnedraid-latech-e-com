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

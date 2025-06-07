import Cookies from 'js-cookie'

const TOKEN_KEY = 'token'

export const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7 }) // Token expires in 7 days
}

export const getToken = () => {
  return Cookies.get(TOKEN_KEY)
}

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY)
}

export const isAuthenticated = () => {
  return !!getToken()
}

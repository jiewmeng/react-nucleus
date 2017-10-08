import axios from 'axios'

export function login(params) {
  return axios.post(`${API_URL}/auth/session`, params)
}

export function logout(params) {
  return axios.delete(`${API_URL}/auth/session`, {
    headers: {
      Authorization: `Bearer ${params.token}`
    }
  })
}

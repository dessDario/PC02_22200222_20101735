import { api } from '../boot/axios'

export async function signin(email, password) {
  const resp = await api.post('/node-api/users/signin', { email, password })
  return resp.data
}

export default { signin }

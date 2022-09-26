import request from '@/utils/request'
export function login(data) {

}
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'

  })
}
export const getUserDatailById = (id) => {
  return request({
    url: `/sys/user/${id}`,
    Method: 'GET'
  })
}

export function logout() {

}

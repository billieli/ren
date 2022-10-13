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
    method: 'GET'
  })
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}
/** *
 *  保存用户详情的基础信息
 * **/
export function saveEmployeesInfo(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

/**
 *保存用户信息
 * @param {Object} data
 * @returns
 */
export const saveUserDatail = (data) => {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

export function logout() {

}

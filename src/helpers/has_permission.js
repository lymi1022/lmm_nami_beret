import { getLocalAuth } from '@/helpers/local_auth'

const hasBtnPermission = (permissionName) => {
  const auth = getLocalAuth()
  const isAdmin = auth.type === '0'
  const additionalPermissions = {
    'webhook-management': isAdmin,
    'api-management': isAdmin,
    'whitelist-domain': isAdmin,
  }
  let permissions = window.sessionStorage['permissions']
  if (!permissions) {
    return false
  }
  permissions = {
    ...auth.permissions,
    ...additionalPermissions
  }
  const hasPermission = permissions[permissionName]

  // 没有对应字段判定为有权限？？
  // return typeof hasPermission === 'undefined' ? true : Boolean(hasPermission)

  return Boolean(hasPermission)
}

export default hasBtnPermission

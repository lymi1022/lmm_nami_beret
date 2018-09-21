import callApi from '@/helpers/call_api'
export function getGroupAllList() {
  return callApi(`lp_folders/index`, {
    method: 'get'
  })
}
export function lpRename(id, data, showError) {
  return callApi(`landing_pages/${id}/rename`, {
    method: 'post',
    data,
    showError: showError
  })
}


//////////////////////////// page_builder ///////////////////////////
export function getLandingPage(id) {
  return callApi(`landing_pages/${id}`)
}
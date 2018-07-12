import callApi from '@/helpers/call_api'
export function getGroupAllList() {
  return callApi(`lp_folders/index`, {
    method: 'get'
  })
}


//////////////////////////// page_builder ///////////////////////////
export function getLandingPage(id) {
  return callApi(`landing_pages/${id}`)
}
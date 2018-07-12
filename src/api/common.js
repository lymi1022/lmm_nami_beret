import callApi from '@/helpers/call_api'
export const auth = () => {
    return callApi(`auth/resources`)
}
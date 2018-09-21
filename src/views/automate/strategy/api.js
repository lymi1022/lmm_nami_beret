import callApi from '@/helpers/call_api'
export function getStrategyRuleList() {
  return callApi(`strategy/rule/list`, {
    method: 'get',
  })
}
export function getStrategyAdd(data) {
  return callApi(`strategy/add`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    useJson: true,
    data,
  })
}

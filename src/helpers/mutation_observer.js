export const observeDom = (dom, callback) => {
  const observer = new MutationObserver(callback)
  observer.observe(dom, {
    attribute: true,
    attributeOldValue: true,
  })
  return observer
}
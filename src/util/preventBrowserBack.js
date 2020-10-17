export function prevent () {
  history.pushState(null, null, window.location.href)
  window.addEventListener('popstate', function () {
    history.pushState(null, null, window.location.href)
  })
}

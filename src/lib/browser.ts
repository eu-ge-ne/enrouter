export function pushHistory(to: string) {
  window.history.pushState({}, "", to);
}

export function assignLocation(to: string) {
  window.location.assign(to);
}

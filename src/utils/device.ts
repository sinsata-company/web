export function isMobileDevice(): boolean {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  return /android|iPad|iPhone|iPod/i.test(userAgent)
}

export function isDesktopDevice(): boolean {
  return !isMobileDevice()
}

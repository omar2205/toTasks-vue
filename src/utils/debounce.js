function debounce(fn, delayMs) {
  let timeout
  return (...args) => {
    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => fn(...args), delayMs)
  }
}

export { debounce }

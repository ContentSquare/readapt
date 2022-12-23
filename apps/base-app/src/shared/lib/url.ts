type Params = Record<string, string | number | undefined | null>

export function getQueryString(params?: Params): string {
  if (!params) {
    return ''
  }

  const queryParts = Object.keys(params).map((key) => {
    const value = params[key]
    if (value == null) {
      return key
    }
    return `${key}=${encodeURIComponent(value)}`
  })

  if (queryParts.length === 0) {
    return ''
  }
  return `?${queryParts.join('&')}`
}

Storage

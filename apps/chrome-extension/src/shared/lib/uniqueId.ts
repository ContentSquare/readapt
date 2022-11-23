// Borrowed from here: https://stackoverflow.com/a/44078785
export function uniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

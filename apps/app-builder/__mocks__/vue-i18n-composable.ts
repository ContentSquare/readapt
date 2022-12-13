// TODO: maybe move the mock to "app/provides/withi18n" to increase cohesion
export function useI18n() {
  return {
    t(value: string) {
      return value
    }
  }
}

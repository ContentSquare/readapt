declare const __VERSION__: string

export function useVersion() {
  return __VERSION__ // __VERSION__ gets replaced with the actual value during build
}

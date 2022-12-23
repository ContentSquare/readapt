import { vi } from 'vitest'

export const mockPrompt = (result: string | null) => {
  return vi.spyOn(window, 'prompt').mockReset().mockReturnValueOnce(result)
}

export const mockAlert = () => {
  return vi.spyOn(window, 'alert').mockReset().mockReturnValueOnce(undefined)
}

export const mockConfirm = (result: boolean) => {
  return vi.spyOn(window, 'confirm').mockReset().mockReturnValueOnce(result)
}

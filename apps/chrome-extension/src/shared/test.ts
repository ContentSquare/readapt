export const mockPrompt = (result: string) => {
  return jest.spyOn(window, 'prompt').mockReset().mockReturnValueOnce(result)
}

export const mockAlert = () => {
  return jest.spyOn(window, 'alert').mockReset().mockReturnValueOnce(undefined)
}

export const mockConfirm = (result: boolean) => {
  return jest.spyOn(window, 'confirm').mockReset().mockReturnValueOnce(result)
}

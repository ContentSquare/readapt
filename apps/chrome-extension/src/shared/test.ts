export const mockPrompt = (result: string) => {
  return jest.spyOn(window, 'prompt').mockReset().mockReturnValueOnce(result)
}

export const mockAlert = () => {
  return jest.spyOn(window, 'alert').mockReset().mockReturnValueOnce(undefined)
}

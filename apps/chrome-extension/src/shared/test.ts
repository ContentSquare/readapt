export const mockPrompt = (result: string) => {
  return jest.spyOn(window, 'prompt').mockReturnValueOnce(result)
}

export const mockAlert = () => {
  return jest.spyOn(window, 'alert').mockImplementationOnce(() => undefined)
}

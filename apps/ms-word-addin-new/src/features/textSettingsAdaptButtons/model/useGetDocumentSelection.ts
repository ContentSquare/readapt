export const useGetDocumentSelection = (): Promise<HTMLElement> => {
  return Word.run(async (context: Word.RequestContext) => {
    const rangeSelection = context.document.getSelection()
    await context.sync()
    const htmlSelection = rangeSelection.getHtml()
    await context.sync()
    const domSelection = new DOMParser().parseFromString(htmlSelection.value, 'text/html')
    return domSelection.body
  })
}

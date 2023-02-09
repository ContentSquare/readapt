export const useGetDocumentBody = () => {
  return (): Promise<HTMLElement> => {
    return Word.run(async (context: Word.RequestContext) => {
      const htmlDocument = context.document.body.getHtml()
      await context.sync()
      const domDocument = new DOMParser().parseFromString(htmlDocument.value, 'text/html')
      return domDocument.body
    })
  }
}

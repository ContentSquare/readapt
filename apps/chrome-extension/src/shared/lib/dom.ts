export const appendNewElementToBody = (id: string): HTMLElement => {
  const divElement = document.createElement('div')
  divElement.id = id
  document.body.appendChild(divElement)
  return divElement
}

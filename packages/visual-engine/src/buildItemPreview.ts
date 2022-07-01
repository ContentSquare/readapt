import { ColoredItem, ColoredOption } from '@readapt/settings'

/** @returns html adapted example using {@link ColoredItem} settings */
const buildItemPreview = (options: ColoredOption[], item: ColoredItem) => {
  const option = options.find(({ key }) => key === item.key)
  const examples = option?.examples ?? []
  return adaptExample(examples, item)
}

const adaptExample = (examples: string[], { color, bold }: { color?: string; bold: boolean }): string => {
  const colorStyle = color ? `color: ${color};` : ''
  const boldStyle = bold ? 'font-weight: bold;' : ''
  const style = `${colorStyle} ${boldStyle}`

  return examples
    .map((item: string) => item.replace(/<span>/g, `<span style="${style}">`)) //
    .map((item: string) => `<span>${item}</span>`)
    .join(',&nbsp;')
}

export { buildItemPreview }

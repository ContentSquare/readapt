export const colors = [
  '#5fa2ce',
  '#76b7b2',
  '#b07aa1',
  '#fc7d0b',
  '#a3cce9',
  '#c85200',
  '#7b848f',
  '#59a14f',
  '#ff9da7',
  '#edc948',
  '#9c755f',
  '#ffbc79'
] as const

export type ColorOption = (typeof colors)[number]

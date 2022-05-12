import dts from 'rollup-plugin-dts'

const config = [
  {
    input: './dist/index.d.ts',
    output: [{ file: 'dist/types.d.ts', format: 'es' }],
    plugins: [dts()]
  }
]

export default config

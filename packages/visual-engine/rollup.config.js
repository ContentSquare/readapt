import ts from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'esm' }
    ],
    external: ['@readapt/settings', '@readapt/text-engine', 'lodash/xor'],
    plugins: [ts({ useTsconfigDeclarationDir: true })]
  },
  {
    input: 'src/browser.ts',
    output: [{ file: 'dist/readapt-visual-engine.browser.js', format: 'esm' }],
    plugins: [ts(), resolve(), commonjs()]
  }
]

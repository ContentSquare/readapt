import commonjs from '@rollup/plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'

import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'esm' }
    ],
    external: ['@readapt/dictionaries/dist/en', '@readapt/dictionaries/dist/fr'],
    plugins: [ts({ useTsconfigDeclarationDir: true })]
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/readapt-text-engine.browser.js', name: 'textEngine', format: 'iife' }],
    plugins: [ts(), resolve(), commonjs()]
  }
]

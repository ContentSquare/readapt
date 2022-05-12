import ts from 'rollup-plugin-ts'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import path from 'path'

export default [
  {
    input: path.join(__dirname, './background.ts'),
    output: [{ file: './dist/scripts/background.js', format: 'iife' }],
    plugins: [ts(), resolve(), commonjs(), terser({ compress: true })]
  },
  {
    input: path.join(__dirname, './readapt.ts'),
    output: [{ file: './dist/scripts/readapt.js', format: 'iife' }],
    plugins: [ts(), resolve(), commonjs(), terser({ compress: true })]
  }
]

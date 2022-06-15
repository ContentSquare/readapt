import ts from 'rollup-plugin-ts'

import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'esm' }
    ],
    plugins: [
      ts({
        hook: {
          // generate only one types.d file
          outputPath: (path, kind) => {
            if (kind === 'declaration') {
              return './dist/types.d.ts'
            }
          }
        }
      })
    ]
  }
]

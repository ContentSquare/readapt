import * as readline from 'readline'
import * as fs from 'fs'
import * as path from 'path'

type ingestLineFn = (line: string) => void

const ingestSource =
  (fileSource: string, buildIngestLine: (dictionary: Record<string, unknown[]>) => ingestLineFn, stepName: string) =>
  (dictionary: Record<string, unknown[]>): Promise<Record<string, unknown[]>> =>
    new Promise((resolve) => {
      const lineReader = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname, 'data/', fileSource))
      })

      const ingestLine = buildIngestLine(dictionary)

      lineReader.on('line', ingestLine).on('close', () => {
        console.log(stepName)
        resolve(dictionary)
      })
    })

export default ingestSource

'use strict'

const fs = require('fs')
const zip = require('bestzip')
const Model = require('./src/model')

const pathIn = './in'
const pathOut = './out'

fs.readdir(pathIn, (err, items) => {
  if (err) {
    return
  }

  for (let item of items) {
    if (item.indexOf('.in') === -1) {
      continue
    }

    const fileContent = fs.readFileSync(pathIn + '/' + item, 'ascii')
    const filenameOut = item.split('.')[0] + '.out'

    const input = fileContent.split('\n').filter(x => !!x).map((line, i) => {
      let values = line.split(line.indexOf(' ') > -1 ? ' ' : '')

      if (/^\d/.exec(values[0])) {
        values = values.map(v => +v)
      }

      return values
    })

    const model = new Model(input)

    model.process()

    fs.writeFile(pathOut + '/' + filenameOut, model.parseOutput(), err =>
      console.log(!err ? `The file '${filenameOut}' was saved!` : err)
    )
  }
})

zip('./source.zip', ['src/', 'app.js'], err => {
  console[err ? 'error' : 'log'](err ? err.stack : `Sources have been zipped!`)
})

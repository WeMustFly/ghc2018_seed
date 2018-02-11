'use strict'

const fs = require('fs')
const zip = require('bestzip')
const Model = require('./src/model')

const pathIn = './in'
const pathOut = './out'
const keys = ['R', 'C', 'L', 'H']
const filenames = ['example.in', 'small.in', 'medium.in', 'big.in']
const sourceFilenames = ['app.js', 'src/']

fs.readdir(pathIn, (err, items) => {
	if (err) {
		return
	}

	for (let item of items) {
		if (filenames.indexOf(item) === -1) {
			continue
		}

		const fileContent = fs.readFileSync(pathIn + '/' + item, 'ascii')

		let input = fileContent
			.split("\n")
			.filter(x => !!x)
			.map((line, i) => {
				let values = line.split(line.indexOf(' ') > -1 ? ' ' : '')

				if (/^\d/.exec(values[0])) {
					values = values.map(v => +v)
				}

				return values
		    })

		let filenameOut = item.split('.')[0] + '.out'

		let model = new Model(input)

		model.run()

		fs.writeFile(
			pathOut + "/" + filenameOut,
			model.parseOutput(),
			err => console.log(!err ? `The file '${filenameOut}' was saved!` : err)
		) 
	}
})

zip('./source.zip', sourceFilenames, (err) => {
	console[err ? 'error' : 'log'](err
		? err.stack
		: `Sources have been zipped!`
	)
})

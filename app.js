'use strict'

const fs = require('fs')
const zip = require('bestzip')
const run = require('./run')

const pathIn = './in'
const pathOut = './out'
const keys = ['R', 'C', 'L', 'H']
const filenames = ['example.in', 'small.in', 'medium.in', 'big.in']
const sourceFilenames = ['app.js', 'run.js']

fs.readdir(pathIn, (err, items) => {
	if (err) {
		return
	} 

	for (let item of items) {
		if (filenames.indexOf(item) === -1) {
			continue
		}

		let input = {}
		let output = ''

		input.data = []

		const fileContent = fs.readFileSync(pathIn + '/' + item, 'ascii')

		fileContent
			.split("\n")
			.map((line, i) => {
				if (i === 0) {
					let values = line.split(' ')
					keys.map((key, i) => input[key] = +values[i])
				} else {
					if (line !== '') {
					    input.data.push(line.split(''))
					}
				}
		    })

		let filenameOut = item.split('.')[0] + '.out'

		output = run(input)

		fs.writeFile(pathOut + "/" + filenameOut, output, err => {
			if (err) {
				return console.log(err)
			}

			console.log(`The file '${filenameOut}' was saved!`)
		}) 
	}
})

zip('./source.zip', sourceFilenames, (err) => {
	console[err ? 'error' : 'log'](err
		? err.stack
		: `Sources have been zipped!`
	)
})

'use strict'

const {Entity} = require('./entities')
const {Processor} = require('./processors')

class Model {
	constructor(input) {
		this.input = input
		this.entities = {input: [], output: []}
		this.parseInput()
	}

	parseInput() {
		this.entities.input = this.input
	}

	run() {
		this.entities.output = this.entities.input
	}

	parseOutput() {
		return this.entities.output.toString()
	}
}

module.exports = Model

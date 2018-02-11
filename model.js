'use strict'

/**
 * Here is the place for our classes
 */

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

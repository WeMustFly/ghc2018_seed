'use strict'

const {Video, Endpoint, Server, Connect, Requests} = require('./entities')
const {Processor} = require('./processors')

class Model {
	constructor(input) {
		this.input = input
		this.entities = {input: {}, output: {}}
		this.parseInput()
	}

	parseInput() {
		let inp = this.entities.input;

		inp.videos = []
		for (let i = 0; i < this.input[0][0]; i++) {
			inp.videos.push(new Video(i, this.input[1][i]))
		}

		inp.servers = []
		for (let i = 0; i < this.input[0][3]; i++) {
			inp.servers.push(new Server(i, this.input[0][4]))
		}

		let j = 2
		inp.endpoints = []
		for (let i = 0; i < this.input[0][1]; i++) {
			let endpoint = new Endpoint(i, this.input[j][0])

			inp.endpoints.push(endpoint)

			for (let x = 0; x < this.input[j][1]; x++) {
				let row = this.input[j + x + 1]
				endpoint.connections.push(new Connect(x, inp.servers[row[0]], row[1]))
			}
			j += this.input[j][1] + 1
		}

		inp.requests = []
		for (let i = 0; i < this.input[0][2]; i++) {
			let row = this.input[j]
			inp.requests.push(new Requests(inp.videos[row[0]], inp.endpoints[row[1]], row[2]))
			j++
		}
	}

	run() {
		this.entities.output = this.entities.input
	}

	parseOutput() {
		return this.entities.output.toString()
	}
}

module.exports = Model

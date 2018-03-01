'use strict'

const { Vehicle, Ride } = require('./entities')
const { Processor } = require('./processors')

class Model {
  constructor (input) {
    this.input = input
    this.entities = { input: [], output: [] }
    this.parseInput()
  }

  parseInput () {
    let from = this.input
    let to = this.entities.input

    to.R = from[0][0]
    to.C = from[0][1]
    to.F = from[0][2]
    to.N = from[0][3]
    to.B = from[0][4]
    to.T = from[0][5]

    to.vehicles = []
    for (let i = 0; i < to.F; i++) {
      to.vehicles.push(new Vehicle(i))
    }

    to.rides = []
    for (let i = 0; i < to.N; i++) {
      to.rides.push(new Ride(
        i,
        from[i + 1][0],
        from[i + 1][1],
        from[i + 1][2],
        from[i + 1][3],
        from[i + 1][4],
        from[i + 1][5]
      ))
    }
  }

  process () {
    let processor = new Processor(this.entities)
    processor.process()
  }

  parseOutput () {
    return this.entities.output.toString()
  }
}

module.exports = Model

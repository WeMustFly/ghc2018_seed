'use strict'

const { Entity } = require('./entities')
const { Processor } = require('./processors')

class Model {
  constructor (input) {
    this.input = input
    this.entities = { input: [], output: [] }
    this.parseInput()
  }

  parseInput () {
    let entity = new Entity()
    this.entities.input.push(entity)
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

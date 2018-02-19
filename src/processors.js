'use strict'

class Processor {
  constructor (entities) {
    this.entities = entities
  }

  process () {
    this.entities.output = this.entities.input
  }
}

module.exports.Processor = Processor

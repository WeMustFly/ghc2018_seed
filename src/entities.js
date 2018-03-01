'use strict'

class Vehicle {
  constructor (id) {
    this.id = id
    this.currentPos = {r: 0, c: 0}
  }
}

class Ride {
  constructor (id, a, b, x, y, s, f) {
    this.id = id
    this.begin = {a, b}
    this.end = {x, y}
    this.startStep = s
    this.finishStep = f
  }
}

module.exports = {Vehicle, Ride}

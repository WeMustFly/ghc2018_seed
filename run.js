'use strict'

class Pizza {
	constructor(R, C, map) {
		this.R = R
		this.C = C
		this.map = map
		this.t = 0
		this.m = 0

		this.map.forEach(row => row.forEach(cell => cell === 'T' ? this.t++ : this.m++))
	}

}

class Slice {
	constructor(r1, c1, r2, c2) {
		this.r1 = r1
		this.c1 = c1
		this.r2 = r2
		this.c2 = c2
	}


	getPoints() {
		return (this.r2 - this.r1 + 1) * (this.c2 - this.c1 + 1)
	}
}

class Slices {
	constructor(pizza) {
		this.pizza = pizza
		this.items = []

		this.map = []
		for (let i = 0; i < pizza.R; i++) {
			this.map.push('0'.repeat(pizza.C).split('').map(x => +x))
		}
	}

	add(slice) {
		for (let r = slice.r1; r <= slice.r2; r++) {
			for (let c = slice.c1; c <= slice.c2; c++) {
				if (this.map[r][c] === 1) {
					return false
				}
			}
		}

		this.items.push(slice)

		for (let r = slice.r1; r <= slice.r2; r++) {
			for (let c = slice.c1; c <= slice.c2; c++) {
				this.map[r][c] = 1
			}
		}
	}


	getPoints() {
		return this.items.length ? this.items.reduce((a, c) => a + c.getPoints(), 0) : 0
	}
}

class Slicer {
	constructor(L, H) {
		this.L = L
		this.S = L * 2 // Square
		this.H = H
	}

	slice(pizza) {
		let slices = new Slices(pizza)

		for (let h = 1; h <= this.S; h++) {
			for (let w = 1; w <= this.S; w++) {
				if (h * w !== this.S) {
					continue
				}

				for (let r = 0; r < pizza.R - h; r++) {
					for (let c = 0; c < pizza.C - w; c++) {
						let slice = new Slice(r, c, r + h - 1, c + w - 1)

						if (this.check(pizza, slice)) {
							slices.add(slice)
						}
					}
				}
			}
		}

		return slices
	}

	check(pizza, slice) {
		let t = 0
		let m = 0

		for (let r = slice.r1; r <= slice.r2; r++) {
			for (let c = slice.c1; c <= slice.c2; c++) {
				if (pizza.map[r][c] === 'T') {
					t++
				} else {
					m++
				}
			}
		}

		return t >= this.L && m >= this.L
	}
}

const run = input => {
	let output = ''

	const pizza = new Pizza(input.R, input.C, input.data)
	const slicer = new Slicer(input.L, input.H)

	let slices = slicer.slice(pizza) 

	console.log('Points: ' + slices.getPoints())

	output = slices.items.length
		+ "\n"
		+ slices.items.map(x => `${x.r1} ${x.c1} ${x.r2} ${x.c2}`).join("\n")

	return output
}

module.exports = run

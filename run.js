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
	constructor(L) {
		this.L = L
		this.S = L * 2 // Square
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

class Grower {
	constructor(H) {
		this.H = H
	}

	checkVerticalGrowing(slices, slice, r) {
		if (r < 0 || r >= slices.pizza.R) {
			return false
		}

		if (slice.getPoints() + slice.c2 - slice.c1 + 1 > this.H) {
			return false
		}

		for (let c = slice.c1; c <= slice.c2; c++) {
			if (slices.map[r][c] === 1) {
				return false
			}
		}

		return true
	}

	checkHorizontalGrowing(slices, slice, c) {
		if (c < 0 || c >= slices.pizza.C) {
			return false
		}

		if (slice.getPoints() + slice.r2 - slice.r1 + 1 > this.H) {
			return false
		}

		for (let r = slice.r1; r <= slice.r2; r++) {
			if (slices.map[r][c] === 1) {
				return false
			}
		}

		return true
	}

	grow(slices) {
		let points = 0

		while (points !== slices.getPoints()) {
			for (let i in slices.items) {
				let slice = slices.items[i]

				if (this.checkVerticalGrowing(slices, slice, slice.r1 - 1)) {
					slice.r1--

					for (let c = slice.c1; c <= slice.c2; c++) {
						slices.map[slice.r1][c] = 1
					}
				}

				if (this.checkVerticalGrowing(slices, slice, slice.r2 + 1)) {
					slice.r2++

					for (let c = slice.c1; c <= slice.c2; c++) {
						slices.map[slice.r2][c] = 1
					}
				}

				if (this.checkHorizontalGrowing(slices, slice, slice.c1 - 1)) {
					slice.c1--

					for (let r = slice.r1; r <= slice.r2; r++) {
						slices.map[r][slice.c1] = 1
					}
				}

				if (this.checkHorizontalGrowing(slices, slice, slice.c2 + 1)) {
					slice.c2++

					for (let r = slice.r1; r <= slice.r2; r++) {
						slices.map[r][slice.c2] = 1
					}
				}
			}

			points = slices.getPoints()
		}
	}
}

const run = input => {
	let output = ''

	const pizza = new Pizza(input.R, input.C, input.data)
	const slicer = new Slicer(input.L)
	const grower = new Grower(input.H)

	let slices = slicer.slice(pizza) 
	grower.grow(slices)

	console.log('Points: ' + slices.getPoints())

	output = slices.items.length
		+ "\n"
		+ slices.items.map(x => `${x.r1} ${x.c1} ${x.r2} ${x.c2}`).join("\n")

	return output
}

module.exports = run

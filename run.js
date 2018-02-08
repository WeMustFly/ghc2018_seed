'use strict'

const run = input => {
	let output = ''

	const pizza = input.data
	const R = input.R
	const C = input.C
	const L = input.L
	const H = input.H

	const isSlice = (pizza, L, r1, c1, r2, c2) => {
		let m = 0
		let t = 0

		for (let r = r1; r <= r2; r++) {
			for (let c = c1; c <= c2; c++) {
				let cell = pizza[r][c]

				cell === 'M' && m++
				cell === 'T' && t++

				if (m >= L && t >= L) {
					return true
				}
			}
		}

		return false
	}

	const getSlices = (pizza, height, width, R, C, L) => {
		let slices = []

		for (let r1 = 0; r1 + height <= R; r1++) {
		    for (let c1 = 0; c1 + width <= C; c1++) {
				let r2 = r1 + height - 1
				let c2 = c1 + width - 1

				if (isSlice(pizza, L, r1, c1, r2, c2)) {
					slices.push([r1, c1, r2, c2])
				}
			}
		}

		return slices
	}

	let slices = []

	for (let height = 1; height <= R; height++) {
	    console.log(`Current height of slice: ${height}`)

	    for (let width = 1; width <= C; width++) {
			if (width * height > H) {
				continue
			}

			slices = slices.concat(getSlices(pizza, height, width, R, C, L))
		}
	}
	console.log(`Total slices: ${slices.length}`)

	const sumGroup = group => group.reduce(
		(a, s) => a + (s[2] - s[0] + 1) * (s[3] - s[1] + 1), 0
	)

	const cmpGroups = (group1, group2) => {
		let s1 = sumGroup(group1)
		let s2 = sumGroup(group2)

		if (s1 === s2) {
			return 0
		} else if (s1 > s2) {
			return 1
		} else {
			return -1
		}
	}

	const overlap = (group, slice) => {
		const intersect = (x1, y1, x2, y2, X1, Y1, X2, Y2) =>
			((x1 >= X1 && x1 <= X2) && (y1 >= Y1 && y1 <= Y2))
			|| ((x1 >= X1 && x1 <= X2) && (y2 >= Y1 && y2 <= Y2))
			|| ((x2 >= X1 && x2 <= X2) && (y1 >= Y1 && y1 <= Y2))
			|| ((x2 >= X1 && x2 <= X2) && (y2 >= Y1 && y2 <= Y2))
			|| ((x1 <= X1 && x2 >= X2) && (y1 === y2 && y1 >= Y1 && y1 <= y2))

		let [Y1, X1, Y2, X2] = slice

		for (let i = 0; i < group.length; i++) {
			let [y1, x1, y2, x2] = group[i]

			if (
				intersect(x1, y1, x2, y2, X1, Y1, X2, Y2)
				|| intersect(X1, Y1, X2, Y2, x1, y1, x2, y2)
			) {
				return true
			}
		}
		
		return false
	}

	let group = []
	for (let i = 0; i < slices.length; i++) {
	    console.log(`Group ${i} from ${slices.length}`)

		let tmpGroup = [slices[i]]

	    for (let j = i + 1; j < slices.length; j++) {
			if (false === overlap(tmpGroup, slices[j])) {
			    tmpGroup.push(slices[j])
			}
		}

		if (!group.length || cmpGroups(group, tmpGroup) === -1) {
			group = tmpGroup
		}
	}

	console.log('Points: ' + sumGroup(group))

	output = group.length + "\n" + group.map(x => x.join(' ')).join("\n")

	return output
}

module.exports = run

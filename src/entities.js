'use strict'

class Video {
	constructor(id, size) {
		this.id = id
		this.size = size
	}
}

class Endpoint {
	constructor(id, latency) {
		this.id = id
		this.latency = latency
		this.connections = []
	}
}

class Server {
	constructor(id, capacity) {
		this.id = id
		this.capacity = capacity
		this.videos = []
	}
}

class Connect {
	constructor(id, server, latency) {
		this.id = id
		this.server = server
		this.latency = latency
	}
}

class Requests {
	constructor(video, endpoint, quantity) {
		this.video = video
		this.endpoint = endpoint
		this.quantity = quantity
	}
}

module.exports = {
	Video,
	Endpoint,
	Server,
	Connect,
	Requests
}

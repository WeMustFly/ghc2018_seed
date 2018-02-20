'use strict'

class Processor {
  constructor (entities) {
    this.entities = entities
  }

  process () {
    let servers = this.entities.input.servers
    let videos = this.entities.input.videos

    for (let video of videos) {
      for (let server of servers) {
        let s = server.videos.reduce((a, c) => a + c.size, 0)

        if (server.capacity <= video.size + s) {
          server.videos.push(video)
        }
      }
    }

    this.entities.output.servers = servers
  }
}

module.exports.Processor = Processor

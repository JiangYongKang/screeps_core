/**
 *  随机走停策略
 */

export default class Movement {
  constructor(maxRemainingTime = 3000, maxMovingTime = 3000) {
    this.canMove = false
    this.maxRemainingTime = maxRemainingTime
    this.maxMovingTime = maxMovingTime
    this.direction = true
    
    this.move = this.move.bind(this)
    this.stop = this.stop.bind(this)

    this.start()
  }

  start() {
    this.move()
  }

  stop() {
    this.canMove = false
    this.direction = this.randomDirection()
    const randomRemainingTime = Math.floor(Math.random() * this.maxRemainingTime)
    setTimeout(this.move, randomRemainingTime)
  }

  move() {
    this.canMove = true
    this.direction = this.randomDirection()
    const randomMoveTime = Math.floor(Math.random() * this.maxMovingTime)
    setTimeout(this.stop, randomMoveTime)
  }

  randomDirection() {
    return Math.floor(Math.random() * 10) % 2 == 0
  }
}
import Pool from './base/pool'

export const STATE = {
  BEGIN: 0,
  RUN: 1,
  OVER: 2,
  RANK: 3
}

let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.pool = new Pool()
    this.state = STATE.RANK
    this.isBegin = true
    this.reset()
  }

  reset() {
    this.frame      = 0
    this.score      = 0
    this.obstacles  = []
    this.animations = []
    this.gameOver   = false

    this.badBullets  = []
    this.loveBullets = []
  }

  /**
   * 回收敌人，进入对象池
   * 此后不进入帧循环
   */
  removeObstacle(obstacle) {
    let temp = this.obstacles.shift()

    temp.visible = false

    this.pool.recover('obstacle', obstacle)
  }

  /**
   * 回收子弹，进入对象池
   * 此后不进入帧循环
   */
  removeLoveBullets(bullet) {
    let temp = this.loveBullets.shift()
    // if (!temp) {
    //   return
    // }

    temp.visible = false

    this.pool.recover('loveBullet', bullet)
  }

  removeBadBullets(bullet) {
    let temp = this.badBullets.shift()

    // if (!temp) {
    //   return
    // }

    temp.visible = false

    this.pool.recover('badBullte', bullet)
  }

  bullets() {
   return this.loveBullets.concat(this.badBullets)
  }

}

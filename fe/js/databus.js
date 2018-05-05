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

    /**
     * TODO: FIXME
     * 非常 Trick 的方式 fix 一个bug
     * 当 bullets 发生碰撞检测成功后，它的位置不会发生改变，此时该 bullets 不会主动被 remove，
     * 而当下一个 未碰撞的 bullets 被离屏删除时，temp 与 bullet 不是一个变量，此时存入 pool 会使
     * 弹道不再规律
     * 
     * 有时间换个方式再修
     */
    let temp = this.loveBullets.shift()
    while(temp && temp !== bullet) {
      temp = this.loveBullets.shift()
    }

    temp.visible = false
    this.pool.recover('loveBullet', bullet)
  }

  removeBadBullets(bullet) {
    let temp = this.badBullets.shift()

    temp.visible = false

    this.pool.recover('badBullet', bullet)
  }

  bullets() {
   return this.loveBullets.concat(this.badBullets)
  }

}

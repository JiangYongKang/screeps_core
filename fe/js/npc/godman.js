import Sprite   from '../base/sprite'
import DataBus  from '../databus'
import Movement from './../utils/movement'

const screenWidth    = window.innerWidth
const screenHeight   = window.innerHeight

// be-chased被追者相关常量设置
const BE_CHASED_IMG_SRC = 'images/hero.png'
const BE_CHASED_WIDTH   = 80
const BE_CHASED_HEIGHT  = 80
const BE_CHASED_X_SPEED = 1

let databus = new DataBus()

/**
 * 这是你男神
 */

export default class Godman extends Sprite {
  constructor() {
    super(BE_CHASED_IMG_SRC, BE_CHASED_WIDTH, BE_CHASED_HEIGHT)

    // 玩家默认处于屏幕底部居中位置
    this.x = screenWidth / 2 - this.width / 2
    this.y = this.height - 70

    // true: left; false: right
    this.direction = true
    this.movement = new Movement()
  }

  /**
   * 当手指触摸屏幕的时候
   * 判断手指是否在飞机上
   * @param {Number} x: 手指的X轴坐标
   * @param {Number} y: 手指的Y轴坐标
   * @return {Boolean}: 用于标识手指是否在飞机上的布尔值
   */
  checkIsFingerOnAir(x, y) {
    const deviation = 30

    return !!(   x >= this.x - deviation
              && y >= this.y - deviation
              && x <= this.x + this.width + deviation
              && y <= this.y + this.height + deviation  )
  }

  /**
   * 根据手指的位置设置飞机的位置
   * 保证手指处于飞机中间
   * 同时限定飞机的活动范围限制在屏幕中
   */
  setAirPosAcrossFingerPosZ(x, y) {
    let disX = x - this.width / 2
    let disY = y - this.height / 2

    if ( disX < 0 )
      disX = 0

    else if ( disX > screenWidth - this.width )
      disX = screenWidth - this.width

    if ( disY <= 0 )
      disY = 0

    else if ( disY > screenHeight - this.height )
      disY = screenHeight - this.height

    this.x = disX
    this.y = disY
  }
  // 更新
  update() {
    if(!this.movement.canMove) {
      return
    }

    if(this.direction) {
        this.x -= BE_CHASED_X_SPEED
    } else {
        this.x += BE_CHASED_X_SPEED
    }

    if(screenWidth < (this.x + this.width) || 0 > this.x) { 
        this.direction = !this.direction
    }

  }

}

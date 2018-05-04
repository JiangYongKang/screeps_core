import Animation from '../base/animation'
import DataBus   from '../databus'

const OBSTACLE_IMG_SRC = 'images/friendzonedCard.png'
const OBSTACLE_WIDTH   = 60
const OBSTACLE_HEIGHT  = 25

const __ = {
  speed: Symbol('speed')
}

let databus = new DataBus()

function rnd(start, end){
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Obstacle extends Animation {
  constructor() {
    super(OBSTACLE_IMG_SRC, OBSTACLE_WIDTH, OBSTACLE_HEIGHT)

    this.initExplosionAnimation()
  }

  init(speed) {
    this.x = rnd(0, window.innerWidth - OBSTACLE_WIDTH)
    this.y = -this.height

    this[__.speed] = speed

    this.visible = true
  }

  // 预定义爆炸的帧动画
  initExplosionAnimation() {
    let frames = []

    const EXPLO_IMG_PREFIX  = 'images/explosion'
    const EXPLO_FRAME_COUNT = 19

    for ( let i = 0;i < EXPLO_FRAME_COUNT;i++ ) {
      frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png')
    }

    this.initFrames(frames)
  }

  // 每一帧更新子弹位置
  update() {
    this.y += this[__.speed]
    // 对象回收
    if ( this.y > window.innerHeight + this.height )
      databus.removeObstacle(this)
  }
}

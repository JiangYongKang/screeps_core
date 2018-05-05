import Sprite   from '../base/sprite'
import Animation from '../base/animation'
import DataBus  from '../databus'

import { 
  BULLET_IMG_SRC
} from '../config/index'

const BULLET_WIDTH   = 20
const BULLET_HEIGHT  = 20

const __ = {
  speed: Symbol('speed')
}

let databus = new DataBus()

export default class Bullet extends Animation {
  constructor(skins, width = BULLET_WIDTH, height = BULLET_HEIGHT) {
    super(skins, width, height)
  }

  init(x, y, speed) {
    this.x = x
    this.y = y

    this[__.speed] = speed

    this.visible = true
  }

  // 每一帧更新子弹位置
  update() {
    if (!this.isPlaying) {
      this.y -= this[__.speed]
    }
    // 超出屏幕外回收自身
    if ( this.y < -this.height) {
      this.remove()
    }
  }

  remove() {
    throw new Error('you should override this function')
  }
  
}

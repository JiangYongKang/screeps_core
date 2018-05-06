import Sprite   from '../base/sprite'
import DataBus  from '../databus'
import { 
  GODMAN_IMG_SRC,
  screenWidth,
  screenHeight,
} from '../config/index'

const GLOW_IMG_SRC = 'images/glow2.png'

// be-chased被追者相关常量设置
const BE_CHASED_WIDTH   = 150
const BE_CHASED_HEIGHT  = 100
const BE_CHASED_X_SPEED = 1

let databus = new DataBus()

/**
 * 这是你男神光环
 */

export default class Glow extends Sprite {
  constructor() {
    super(GLOW_IMG_SRC, BE_CHASED_WIDTH, BE_CHASED_HEIGHT)
    this.alpha = 0
    this.ctx = wx.createCanvas().getContext('2d')
    this.glow = true
  }

  // 更新
  update(godman) {

    this.x = godman.x - 50
    this.y = godman.y - 2
    if(this.alpha >= 1) {
        this.alpha -= 0.001
    } else {
        this.alpha += 0.001
    }
 
  }

}

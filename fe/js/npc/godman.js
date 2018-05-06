import Sprite   from '../base/sprite'
import DataBus  from '../databus'
import Movement from './../utils/movement'
import { 
  GODMAN_IMG_SRC,
  screenWidth,
  screenHeight,
} from '../config/index'


// be-chased被追者相关常量设置
const BE_CHASED_WIDTH   = 80*129/192
const BE_CHASED_HEIGHT  = 80
const BE_CHASED_X_SPEED = 1

let databus = new DataBus()

/**
 * 这是你男神
 */

export default class Godman extends Sprite {
  constructor() {
    super(GODMAN_IMG_SRC, BE_CHASED_WIDTH, BE_CHASED_HEIGHT)

    // 玩家默认处于屏幕底部居中位置
    this.x = screenWidth / 2 - this.width / 2
    this.y = this.height - 75

    // true: left; false: right
    this.direction = true
    this.movement = new Movement()
  }

  // 更新
  update() {
    if(!this.movement.canMove) {
      this.direction = this.movement.direction
      return
    }
    
    if(screenWidth < (this.x + this.width) || 0 > this.x) { 
        this.direction = !this.direction
    }

    if(this.direction) {
      this.x -= BE_CHASED_X_SPEED
    } else {
      this.x += BE_CHASED_X_SPEED
    }

    const grades = ['basic', 'normal', 'medium', 'high']
    const min = Math.min(3, Math.floor(databus.score / 50))
    const grade = grades[min]
    this.updateGrade(grade)
  }

  updateGrade(grade) {
    const img = 'images/grade/man-' + grade + '.png'
    this.img.src = img
  }

}

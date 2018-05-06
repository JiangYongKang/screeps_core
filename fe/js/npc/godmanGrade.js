import Sprite from '../base/sprite'
import { 
  screenHeight,
  screenWidth,
} from '../config/index'

const GODMAN_GRADE_WIDTH = 40
const GODMAN_GRADE_HEIGHT = 40

function suffix(unlocked) {
  return unlocked ? '.png' : '-lock.png'
}

class GodmanGradeItem extends Sprite {
  constructor(baseImg, unlocked = false) {
    const image = baseImg + suffix(unlocked)
    super(image, GODMAN_GRADE_WIDTH, GODMAN_GRADE_HEIGHT)
    this.baseImg = baseImg    
}
  drawToCanvas(ctx) {
    super.drawToCanvas(ctx)
  }
  unlock() {
    this.img.src = this.baseImg + suffix(true)
  }
}

const basicGrade = new GodmanGradeItem('images/grade/basic', true)
const normalGrade = new GodmanGradeItem('images/grade/normal')
const mediumGrade = new GodmanGradeItem('images/grade/medium')
const highGrade = new GodmanGradeItem('images/grade/high')

const grayBg = 'images/grade/grayBg.png'
const container = 'images/grade/container.png'
const containerWidth = 300
const containerHeight = 340

class GodmanGrade {
  constructor() {  
    this.grades = [basicGrade, normalGrade, mediumGrade, highGrade]
    this.bg = new Sprite(grayBg, screenWidth, screenHeight)
    this.container = new Sprite(container, 
      containerWidth,
      containerHeight,
      (screenWidth - containerWidth)/2, 
      (screenHeight - containerHeight)/2,
    )
  }

  render(ctx, store) {
    this.bg.drawToCanvas(ctx)
    this.container.drawToCanvas(ctx)
    const grade =  Math.floor(store / 50)

    const topEdge = 40
    const startX = this.container.x
    const startY = this.container.y + topEdge
    const containerSquare = this.container.width

    const space = 20
    const itemSquare = (containerSquare - space * 3) / 2

    for (let i = 0; i < this.grades.length; i ++) {
      const item = this.grades[i]
      if (i <= grade) {
        item.unlock()
      }
      item.width = itemSquare
      item.height = itemSquare
      const horizontalIndex = i % 2
      const verticalIndex = Math.floor(i / 2)
      item.x = startX + horizontalIndex * itemSquare + space * (horizontalIndex + 1)
      item.y = startY + verticalIndex * itemSquare + space * (verticalIndex + 1)
      
      item.drawToCanvas(ctx)
    }
  }
}

const godmanGrade = new GodmanGrade()
export default godmanGrade
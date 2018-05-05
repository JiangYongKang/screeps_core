import Animation from '../base/animation'

const LIFEBAR_ITEM_WIDTH = 20
const LIFEBAR_ITEM_HEIGHT = 20
const LIFTBAR_ITEM_IMG_SRC = 'images/life.png'
const LIFEBAR_START_X = 15
const LIFEBAR_START_Y = 40

class LifebarItem extends Animation {
  constructor(img = LIFTBAR_ITEM_IMG_SRC) {
    super(img, LIFEBAR_ITEM_WIDTH, LIFEBAR_ITEM_HEIGHT)
    this.animationScale = 1.2
    this.initExplosionAnimation()
  }

  initExplosionAnimation() {
    let frames = []

    const EXPLO_IMG_PREFIX  = 'images/lifebarItem/heart'
    const EXPLO_FRAME_COUNT = 30

    for ( let i = 0;i < EXPLO_FRAME_COUNT;i++ ) {
      frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png')
    }

    this.initFrames(frames)
  }
}

export default class Lifebar { 
  constructor(ctx, lifeCount, startX = LIFEBAR_START_X, startY = LIFEBAR_START_Y) {
    this.ctx = ctx
    this.lifebarItems = []
    this.startX = startX
    this.startY = startY
    
    this.setupItems(ctx, lifeCount)
    this.render(ctx)
  }

  setupItems(ctx, lifeCount) {
    const space = 5
    for(let i = 0; i < lifeCount; i++) {
      const lifebarItem = new LifebarItem()
      this.lifebarItems.push(lifebarItem)

      lifebarItem.x = i != 0 ? (this.startX + i * (lifebarItem.width + space)) : this.startX
      lifebarItem.y = this.startY

      lifebarItem.drawToCanvas(ctx)
    }
  }

  render(ctx) {
    this.lifebarItems.forEach((item) => {
      item.drawToCanvas(ctx)
    })
  }
  
  reduceLifeCount() {
    const lifebarItem = this.lifebarItems.pop()
    if (lifebarItem) {
      lifebarItem.playAnimation()
    }
  }

}
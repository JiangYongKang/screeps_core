import Bullet from './bullet'
import DataBus  from '../databus'
import {
  BAD_BULLET_IMG_SRC
} from '../config/index'

let databus = new DataBus()

export default class BadBullet extends Bullet {
  constructor() {
     super(BAD_BULLET_IMG_SRC, 35, 35)
     this.interval = 1000 / 15
     this.initExplosionAnimation()
  }

  initExplosionAnimation() {
    let frames = []

    const EXPLO_IMG_PREFIX  = 'images/badBullet/bh'
    const EXPLO_FRAME_COUNT = 9

    for ( let i = 0;i < EXPLO_FRAME_COUNT;i++ ) {
      frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png')
    }

    this.initFrames(frames)
  }

  remove() {
    databus.removeBadBullets(this)
  }
}
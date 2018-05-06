import Bullet from './index'
import DataBus  from '../databus'
import { 
  LOVE_BULLET_IMG_SRC
} from '../config/index'

let databus = new DataBus()

export default class LoveBullet extends Bullet {
  constructor() {
    super(LOVE_BULLET_IMG_SRC)
    this.initExplosionAnimation()   
  }

  initExplosionAnimation() {
    let frames = []

    const EXPLO_IMG_PREFIX  = 'images/loveBullet/explore'
    const EXPLO_FRAME_COUNT = 24

    for ( let i = 0;i < EXPLO_FRAME_COUNT;i++ ) {
      frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png')
    }

    this.initFrames(frames)
  }
 
  remove() {
    databus.removeLoveBullets(this)
  }
}
import Bullet from './bullet'
import DataBus  from '../databus'
import { 
  LOVE_BULLET_IMG_SRC
} from '../config/index'

let databus = new DataBus()

export default class LoveBullet extends Bullet {
  constructor() {
    super(LOVE_BULLET_IMG_SRC)
  }
 
  remove() {
    databus.removeLoveBullets(this)
  }
}
import Bullet from './bullet'
import DataBus  from '../databus'
import {
  BAD_BULLET_IMG_SRC
} from '../config/index'

let databus = new DataBus()

export default class BadBullet extends Bullet {
  constructor() {
     super(BAD_BULLET_IMG_SRC, 50, 50)
  }
  remove() {
    databus.removeBadBullets(this)
  }
}
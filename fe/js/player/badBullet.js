import Bullet from './bullet'
import DataBus  from '../databus'

let databus = new DataBus()

export default class BadBullet extends Bullet {
  constructor(props) {
     super(props)
     // set up images
  }
  remove() {
    databus.removeBadBullets(this)
  }
}
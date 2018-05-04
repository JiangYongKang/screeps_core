import Player from './player/index'
import Obstacle from './npc/obstacle'
import Godman from './npc/godman'
import Badman from './npc/badman'
import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './databus'

//常量
let life = 3

let ctx = canvas.getContext('2d')
let databus = new DataBus()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0

    this.restart()
  }

  restart() {
    databus.reset()

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    this.bg = new BackGround(ctx)
    this.player = new Player(ctx)
    this.godman = new Godman(ctx)
    this.badman = new Badman(ctx)
    this.gameinfo = new GameInfo()
    this.music = new Music()

    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  /**
   * 随着帧数变化的敌机生成逻辑
   * 帧数取模定义成生成的频率
   */
  obstacleGenerate() {
    if (databus.frame % 30 === 0) {
      let obstacle = databus.pool.getItemByClass('obstacle', Obstacle)
      obstacle.init(6)
      databus.obstacles.push(obstacle)
    }
  }
  // 全局碰撞检测
  collisionDetection() {
    let that = this

    databus.bullets.forEach((bullet) => {
      for (let i = 0, il = databus.obstacles.length; i < il; i++) {
        let obstacle = databus.obstacles[i]
          
        if (!obstacle.isPlaying && obstacle.isCollideWith(bullet)) {
          obstacle.playAnimation()
          that.music.playExplosion()

          bullet.visible = false
          
          break
        }
      }
      // 被追者记分判断
      if (this.godman.isCollideWith(bullet)) {
        bullet.visible = false
        databus.score += 1
      }
    })

    for (let i = 0, il = databus.obstacles.length; i < il; i++) {
      let obstacle = databus.obstacles[i]

      if (this.player.isCollideWith(obstacle)) {
        
        obstacle.playAnimation()
        life -= 1
        if(life <= 0) {
          databus.gameOver = true
        }
        break
      }
    }
  }

  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArea

    if (x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY)
      this.restart()
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.bg.render(ctx)

    databus.bullets
      .concat(databus.obstacles)
      .forEach((item) => {
        item.drawToCanvas(ctx)
      })

    this.player.drawToCanvas(ctx)
    this.godman.drawToCanvas(ctx)
    this.badman.drawToCanvas(ctx)
    databus.animations.forEach((ani) => {
      if (ani.isPlaying) {
        ani.aniRender(ctx)
      }
    })

    this.gameinfo.renderGameScore(ctx, databus.score)

    // 游戏结束停止帧循环
    if (databus.gameOver) {
      this.gameinfo.renderGameOver(ctx, databus.score)

      if (!this.hasEventBind) {
        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }
  }

  // 游戏逻辑更新主函数
  update() {
    if (databus.gameOver)
      return;

    this.bg.update()
    this.godman.update()
    this.badman.update()
    databus.bullets
      .concat(databus.obstacles)
      .forEach((item) => {
        item.update()
      })

    this.obstacleGenerate()

    this.collisionDetection()

    if (databus.frame % 20 === 0) {
      this.player.shoot()
      this.badman.shoot()
      this.music.playShoot()
    }
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}

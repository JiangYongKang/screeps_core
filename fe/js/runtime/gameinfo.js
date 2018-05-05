
const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

let atlas = new Image()
atlas.src = 'images/Common.png'

let begin = new Image()
begin.src = 'images/begin.png'
export default class GameInfo {
  renderGameScore(ctx, score) {
    ctx.fillStyle = "#ffffff"
    ctx.font      = "20px Arial"

    ctx.fillText(
      '得分: ' + score,
      10,
      30
    )
  }

  renderPlayerLife(ctx, life) {
    ctx.fillStyle = "#ffffff"
    ctx.font      = "20px Arial"

    ctx.fillText(
      '生命: ' + life,
      10,
      50
    )
  }

  renderGameBegin(ctx) {
    ctx.drawImage(begin, 0, 0, screenWidth, screenHeight)
    // 开始游戏按钮test
    // ctx.rect(screenWidth / 2 - 60,screenHeight / 2 + 97,120,45)
    // ctx.stroke()

    // 排行榜按钮test
    // ctx.arc(screenWidth / 2 - 53,screenHeight - 52, 22, 0, 2 * Math.PI)
    // ctx.stroke()
 
    this.btnBegin = {
      startX: screenWidth / 2 - 60,
      startY: screenHeight / 2 + 97,
      endX  : screenWidth / 2 - 60 + 120,
      endY  : screenHeight / 2 + 97 + 45
    }
    this.btnRank = {
      startX: screenWidth / 2 - 53 - 22,
      startY: screenHeight - 52 - 22,
      endX  : screenWidth / 2 - 53 + 22,
      endY  : screenHeight - 52 + 22
    }
  }

  renderRank() {
    ctx.drawImage(begin, 0, 0, screenWidth, screenHeight)
  }

  renderGameOver(ctx, score) {
    ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300)

    ctx.fillStyle = "#ffffff"
    ctx.font    = "20px Arial"

    ctx.fillText(
      '游戏结束',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 50
    )

    ctx.fillText(
      '得分: ' + score,
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 130
    )

    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 60,
      screenHeight / 2 - 100 + 180,
      120, 40
    )

    ctx.fillText(
      '重新开始',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 205
    )

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnArea = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 100 + 180,
      endX  : screenWidth / 2  + 50,
      endY  : screenHeight / 2 - 100 + 255
    }
  }
}


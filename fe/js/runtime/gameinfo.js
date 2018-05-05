
const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

const offsetX = screenWidth / 414
const offsetY = screenHeight / 736

let over = new Image()
over.src = 'images/over_bg.png'

let begin = new Image()
begin.src = 'images/begin.png'

let rank = new Image()
rank.src = 'images/rank_bg.png'
export default class GameInfo {
  renderGameScore(ctx, score) {
    ctx.fillStyle = "#ffffff"
    ctx.font      = "25px Arial"

    ctx.fillText(
      score,
      15,
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

    // ctx.drawImage(over, 0, 0,screenWidth, screenHeight)
  
    ctx.drawImage(begin, 0, 0, screenWidth, screenHeight)
    // 开始游戏按钮test
   
    // ctx.rect(screenWidth / 2 - offsetX * 37, screenHeight / 2 + offsetY * 120, offsetX * 145, offsetY * 43)
    // 排行榜按钮test
    // ctx.arc(screenWidth / 2 ,screenHeight - 72 * offsetY, offsetX * 28.5, 0, 2 * Math.PI)
    // ctx.stroke()
 
    this.btnBegin = {
      startX: screenWidth / 2 - offsetX * 77,
      startY: screenHeight / 2 + offsetY * 152,
      endX  : screenWidth / 2 - offsetX * 77 + offsetX * 156,
      endY  : screenHeight / 2 + offsetY * 152 + offsetY * 55
    }
    this.btnRank = {
      startX: screenWidth / 2 - offsetX * 28.5,
      startY: screenHeight - 72 * offsetY - offsetX * 28.5,
      endX  : screenWidth / 2 + offsetX * 28.5,
      endY  : screenHeight - 72 * offsetY + offsetX * 28.5
    }
  }

  renderRank(ctx) {
    ctx.drawImage(begin, 0, 0, screenWidth, screenHeight)
    ctx.drawImage(rank, 0, 0, 810, 852, screenWidth / 2 - 140, screenHeight / 2 - 160, 280, 300)

    // 开始游戏按钮test
    // ctx.rect(screenWidth / 2 + 93, screenHeight / 2 - 143, 28, 28)
    // ctx.stroke()

    this.btnRankClose = {
      startX: screenWidth / 2 + 93,
      startY: screenHeight / 2 - 143,
      endX  : screenWidth / 2 + 93 + 28,
      endY  : screenHeight / 2 - 143 + 28
    }

    // wx.request({
    //   method: 'GET',
    //   url: 'https://strikingly-game-jam.herokuapp.com/ranking',
    //   success: function(res) {
    //     console.log(res)
    //   }
    // })
    const data = [
      {
          "id": 1,
          "open_id": "xxx",
          "nickname": "李王强",
          "picture": "https://wx.qlogo.cn/mmhead/PiajxSqBRaEKbKlCS9WibkSIaa4cxvUO9p85SQGLibDXztArnSn6HwXSw/64",
          "max_score": 100,
          "created_at": "2018-05-04T16:10:53.323Z",
          "updated_at": "2018-05-04T16:13:44.400Z"
      },
      {
          "id": 2,
          "open_id": "zzz",
          "nickname": "李王强",
          "picture": "https://wx.qlogo.cn/mmhead/PiajxSqBRaEKbKlCS9WibkSIaa4cxvUO9p85SQGLibDXztArnSn6HwXSw/64",
          "max_score": 0,
          "created_at": "2018-05-04T16:13:04.619Z",
          "updated_at": "2018-05-04T16:13:04.619Z"
      },
      {
          "id": 2,
          "open_id": "zzz",
          "nickname": "李王强",
          "picture": "https://wx.qlogo.cn/mmhead/PiajxSqBRaEKbKlCS9WibkSIaa4cxvUO9p85SQGLibDXztArnSn6HwXSw/64",
          "max_score": 0,
          "created_at": "2018-05-04T16:13:04.619Z",
          "updated_at": "2018-05-04T16:13:04.619Z"
      },
      {
          "id": 2,
          "open_id": "zzz",
          "nickname": "李王强",
          "picture": "https://wx.qlogo.cn/mmhead/PiajxSqBRaEKbKlCS9WibkSIaa4cxvUO9p85SQGLibDXztArnSn6HwXSw/64",
          "max_score": 0,
          "created_at": "2018-05-04T16:13:04.619Z",
          "updated_at": "2018-05-04T16:13:04.619Z"
      },
      {
          "id": 2,
          "open_id": "zzz",
          "nickname": "李王强",
          "picture": "https://wx.qlogo.cn/mmhead/PiajxSqBRaEKbKlCS9WibkSIaa4cxvUO9p85SQGLibDXztArnSn6HwXSw/64",
          "max_score": 0,
          "created_at": "2018-05-04T16:13:04.619Z",
          "updated_at": "2018-05-04T16:13:04.619Z"
      }
    ]
    ctx.fillStyle = "#ffffff"
    ctx.font    = "28px 微软雅黑"

    ctx.fillText(
      '排名',
      screenWidth / 2 - 24,
      screenHeight / 2 - 120
    )

    let offsetY = 30
    ctx.fillStyle = "#ffffff"
    ctx.font    = "18px 微软雅黑"
    const renderText= (index, obj) => {
      const [x, y] = [screenWidth / 2 - 120, screenHeight / 2 - 80 + index * offsetY]
      ctx.fillText(
        `${index}.`,
        x,
        y
      )
  
      ctx.fillText(
        obj.nickname,
        x + 70,
        y
      )

      ctx.fillText(
        obj.max_score,
        x + 200,
        y
      )
    }
    for(let index = 0; index < data.length; index++) {
      renderText(index, data[index])
    }
    
  }

  renderGameOver(ctx, score) {
  
    
    ctx.drawImage(over, 0, 0,screenWidth, screenHeight)


    ctx.fillStyle = "#ffffff"
    ctx.font    = "35px 微软雅黑"

    ctx.fillText(
      score,
      screenWidth / 2 - 20,
      screenHeight / 2 - 10
    )

    // ctx.arc(screenWidth / 2 - offsetX * 84,screenHeight /2 + offsetY *142, offsetX * 22, 0, 2 * Math.PI)
    // ctx.rect(screenWidth / 2 + 93, screenHeight / 2 - 143, 28, 28)
    // ctx.stroke()
    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnToBegin = {
      startX: screenWidth / 2 - offsetX * 84 - offsetX * 22,
      startY: screenHeight /2 + offsetY *142 - offsetX * 22,
      endX  : screenWidth / 2 - offsetX * 84 + offsetX * 22,
      endY  : screenHeight /2 + offsetY *142 + offsetX * 22
    }
    // ctx.rect(screenWidth / 2 - 32, screenHeight / 2 + 82, 132, 40)
    this.btnArea = {
      startX: screenWidth / 2 - offsetX * 37,
      startY: screenHeight / 2 + offsetY * 120,
      endX  : screenWidth / 2 - offsetX * 37 + offsetX * 145,
      endY  : screenHeight / 2 + offsetY * 120 + offsetY * 43
    }
  }
}


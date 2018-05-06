import godmanGrade from '../npc/godmanGrade'
const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

const offsetX = screenWidth / 414
const offsetY = screenHeight / 736

const overText= [
  'images/over_text/0-50.png',
  'images/over_text/51-100.png',
  'images/over_text/101-150.png',
  'images/over_text/151-200.png',
]

let over = new Image()
over.src = 'images/over_bg.png'

let begin = new Image()
begin.src = 'images/begin.png'

let rank = new Image()
rank.src = 'images/rank_bg.png'

let rankData, lock, overBackData
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


    ctx.drawImage(begin, 0, 0, screenWidth, screenHeight)
  
    this.btnBegin = {
      startX: screenWidth / 2 - offsetX * 77,
      startY: screenHeight / 2 + offsetY * 152,
      endX  : screenWidth / 2 - offsetX * 77 + offsetX * 156,
      endY  : screenHeight / 2 + offsetY * 152 + offsetY * 55
    }
    this.btnRank = {
      startX: screenWidth / 2 - offsetX * 28.5 - 40,
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

    ctx.fillStyle = "#ffffff"
    ctx.font    = "24px 微软雅黑"

    ctx.fillText(
      '排名',
      screenWidth / 2 - 24,
      screenHeight / 2 - 120
    )

    let offsetY = 25
    ctx.fillStyle = "#ffffff"
    ctx.font    = "18px 微软雅黑"
    const renderText= (index, obj) => {
      const [x, y] = [screenWidth / 2 - 120, screenHeight / 2 - 80 + index * offsetY]
      ctx.fillText(
        `${index + 1}.`,
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
    if(!rankData && !lock) {
      lock = true
      wx.request({
        method: 'GET',
        url: 'https://strikingly-game-jam.herokuapp.com/ranking',
        success: function(res) {
          lock = false
          console.log(res)
          rankData = res
          if(res.statusCode === 200) {
            rankData = res.data.ranking
            for(let index = 0; index < rankData.length; index++) {
              renderText(index, rankData[index])
            
            }
          }
         
        }
      })
    } else if(rankData) {
      for(let index = 0; index < rankData.length; index++) {
        renderText(index, rankData[index])
      
      }
    }
    
  }

  renderGameOver(ctx, score) {
    let x = screenWidth / 2 - 120
    try{
      if(!overBackData && !lock) {
        lock = true
        wx.request({
          method: 'GET',
          url: `https://strikingly-game-jam.herokuapp.com/ranking/${GameGlobal.user_info.id}?max_score=${score}`,
          success: function(res) {
            lock = false
         
            overBackData = res
            if(res.statusCode === 200) {
              console.log(res)
              overBackData = res.data
              ctx.fillStyle = "#ffffff"
              ctx.font    = "18px 微软雅黑"
              ctx.fillText(
                `${overBackData.nickname}`,
                x + 70,
                screenHeight / 2 + 105
              )
              ctx.fillText(
                `${overBackData.rank}.`,
                x,
                screenHeight / 2 + 105
              )
              ctx.fillText(
                score,
                x + 200,
                screenHeight / 2 + 105
              )
            }
         
          
          }
        })
      }
    } catch(e) {
      
    }
    
    
    ctx.drawImage(over, 0, 0, screenWidth, screenHeight)

    // 文本
    ctx.fillStyle = '#F2a2ae'
    ctx.fillRect(screenWidth / 2 - 120, screenHeight / 2 - 160, 250, 40)
    ctx.stroke()
  
    const test = new Image()
    let num = Math.floor(score / 50)

    if(num > 3){
      num = 3
    }
    test.src = overText[num]
    let height1 = 46
    if(num === 1){
      height1 = height1/2
    }
    ctx.drawImage(test, screenWidth / 2 - 120, screenHeight / 2 - 160, 250, height1)

    ctx.fillStyle = "#ffffff"
    ctx.font    = "35px 微软雅黑"

    ctx.fillText(
      score,
      screenWidth / 2 - 12,
      screenHeight / 2 - 60
    )
    ctx.font    = "18px 微软雅黑"
    if(overBackData){
      ctx.fillText(
        `${overBackData.nickname}`,
        x + 70,
        screenHeight / 2 + 105
      )
      ctx.fillText(
        `${overBackData.rank}.`,
        x,
        screenHeight / 2 + 105
      )
      ctx.fillText(
        score,
        x + 200,
        screenHeight / 2 + 105
      )
    }
  
    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnToBegin = {
      startX: screenWidth / 2 - offsetX * 81 - offsetX * 22,
      startY: screenHeight /2 + offsetY *210 - offsetX * 22,
      endX  : screenWidth / 2 - offsetX * 81 + offsetX * 22,
      endY  : screenHeight /2 + offsetY *210 + offsetX * 22
    }
    this.btnArea = {
      startX: screenWidth / 2 - offsetX * 33,
      startY: screenHeight / 2 + offsetY * 188,
      endX  : screenWidth / 2 - offsetX * 33 + offsetX * 145,
      endY  : screenHeight / 2 + offsetY * 188 + offsetY * 43
    }
    this.btnShare = {
      startX: screenWidth / 2 - offsetX * 9,
      startY: screenHeight / 2 - offsetY * 24,
      endX  : screenWidth / 2 - offsetX * 9 + offsetX * 20,
      endY  : screenHeight / 2 - offsetY * 24 + offsetY * 25
    }

   
  }

  renderGodmanGrade(ctx, store) {
    ctx.drawImage(begin, 0, 0, screenWidth, screenHeight)
    godmanGrade.render(ctx, store)
  }
}


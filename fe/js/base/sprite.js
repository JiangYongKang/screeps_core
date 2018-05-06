/**
 * 游戏基础的精灵类
 */
export default class Sprite {
  constructor(imgSrc = '', width=  0, height = 0, x = 0, y = 0) {
    this.img     = new Image()
    this.img.src = imgSrc

    this.width  = width
    this.height = height

    this.x = x
    this.y = y

    this.visible = true
  }

  /**
   * 将精灵图绘制在canvas上
   */
  drawToCanvas(ctx) {
    if ( !this.visible )
      return
    // if(this.glow){
    //   this.drawImage(ctx, this.img, this.x, this.y, this.width, this.height, this.alpha)
    // } else {
      ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.width,
        this.height
      )
    // }
   
  }

  drawImage(ctx, image , x  , y , width, height, alpha)  
  {  
    console.log(alpha)
      // 绘制图片  
      ctx.drawImage(image , x , y, this.width, this.height);  
      // 获取从x、y开始，宽为image.width、高为image.height的图片数据  
      // 也就是获取绘制的图片数据  
      var imgData = ctx.getImageData(x , y , width , height);  
      for (var i = 0 , len = imgData.data.length ; i < len ; i += 4 )  
      {  
          // 改变每个像素的透明度  
          imgData.data[i + 3] = imgData.data[i + 3] * alpha;  
      }  
      // 将获取的图片数据放回去。  
      ctx.putImageData(imgData , x , y);  
  }  

  /**
   * 简单的碰撞检测定义：
   * 另一个精灵的中心点处于本精灵所在的矩形内即可
   * @param{Sprite} sp: Sptite的实例
   */
  isCollideWith(sp) {
    let spX = sp.x + sp.width / 2
    let spY = sp.y + sp.height / 2

    if ( !this.visible || !sp.visible )
      return false

    return !!(   spX >= this.x
              && spX <= this.x + this.width
              && spY >= this.y
              && spY <= this.y + this.height  )
  }
}

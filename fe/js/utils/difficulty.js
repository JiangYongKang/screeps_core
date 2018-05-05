/**
   * 60 frames 为 1 秒
   * 30 ～ 120，即发送间隔从 0.5 秒 到 2秒
   * 
   * 我们把分数作为影响发射速度的考量, 每增加 9 分，递增一个难度。
   * 并设定 9 个难度级别，则存在以下对应关系
   * 
   * 0 级别 ～ 120 frames
   * 1 级别 ～ 110 frames
   * 2 级别 ～ 100 frames
   * ...
   * ...
   * 8 级别 ～ 40 frames
   * 9 级别 ～ 30 frames
   * 
   * frames = 120 - 级别 * 10
   */

  export function calcShootingIntervalFrames(score) {
    // 最大帧数
    const maxShootingIntervalTime = 120
    // 分数递增间隔, 每 9 分增加一个难度
    const scoreInterval = 9
    // 最大困难级别
    const maxDifficulty = 9
    // 0 ~ 9
    const difficulty = Math.min(maxDifficulty, Math.floor(score / scoreInterval))
    // frames = 120 - 级别 * 10
    return maxShootingIntervalTime - difficulty * 10
  }
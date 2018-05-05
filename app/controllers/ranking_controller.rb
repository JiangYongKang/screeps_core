class RankingController < ApplicationController
  def index
    @wechat_users = WechatUser.order(max_score: :desc).limit(10)
    render :index, formats: [:json], layout: nil
  end
end

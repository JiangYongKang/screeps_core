class RankingController < ApplicationController
  def index
    @wechat_users = WechatUser.order(max_score: :desc).limit(10)
    render :index, formats: [:json], layout: nil
  end

  def show
    wechat_user.update!(max_score: show_params['max_score'])
    @rank = WechatUser.where("max_score >= ?", wechat_user.max_score).count
    @nickname = wechat_user.nickname
    render :show, formats: [:json], layout: nil
  end

  private

  def show_params
    params.permit(:id, :max_score)
  end

  def wechat_user
    @wechat_user ||= WechatUser.find(show_params['id'])
  end
end

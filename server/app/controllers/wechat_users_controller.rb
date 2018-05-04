class WechatUsersController < ApplicationController
  def create
    @wechat_user = WechatUser.create!(create_params)
  end

  def update
    @wechat_user = WechatUser.find_by(id: update_params['id'])
    if @wechat_user.max_score < update_params['max_score']
      @wechat_user.update(max_score: update_params['max_score'])
    end
  end

  private

  def create_params
    params.require(:wechat_user).permit(:open_id, :nickname, :picture)
  end

  def update_params
    params.permit(:id, :max_score)
  end
end

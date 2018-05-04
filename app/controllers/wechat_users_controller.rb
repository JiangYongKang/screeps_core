class WechatUsersController < ApplicationController
  def create
    @wechat_user = WechatUser.find_or_create_by!(open_id: open_id)
    @wechat_user.update!(wechat_user_params)
  end

  def update
    @wechat_user = WechatUser.find_by(id: update_params['id'])
    if @wechat_user.max_score < update_params['max_score']
      @wechat_user.update(max_score: update_params['max_score'])
    end
  end

  def destroy
    WechatUser.find(destroy_params['id']).destroy
  end

  private

  def wechat_user_params
    params.require(:wechat_user).permit(:nickname, :picture)
  end

  def update_params
    params.permit(:id, :max_score)
  end

  def destroy_params
    params.permit(:id)
  end

  def open_id
    uri = URI.parse('https://api.weixin.qq.com/sns/jscode2session')
    uri.query = URI.encode_www_form({
        appid: 'wxcc167c30f24a91fe',
        secret: '5bda176375e2a798748b5c35c9c38941',
        js_code: params['code'],
        grant_type: 'authorization_code'
    })
    response_body = JSON.parse(Net::HTTP.get_response(uri).body)
    response_body['openid']
  end
end

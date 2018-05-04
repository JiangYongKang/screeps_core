Rails.application.routes.draw do
  resources :wechat_users, only: [:create, :update]
  resources :ranking, only: [:index]
end

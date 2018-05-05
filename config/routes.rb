Rails.application.routes.draw do
  resources :wechat_users, only: [:create, :update, :destroy]
  resources :ranking, only: [:index, :show]
end

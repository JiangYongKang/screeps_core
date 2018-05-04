class CreateWechatUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :wechat_users do |t|
      t.string :open_id
      t.string :nickname
      t.string :picture
      t.integer :max_score, default: 0

      t.timestamps null: false
    end
    add_index :wechat_users, :open_id, unique: true
  end
end

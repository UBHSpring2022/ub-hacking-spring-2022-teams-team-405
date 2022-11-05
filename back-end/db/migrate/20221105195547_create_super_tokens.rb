class CreateSuperTokens < ActiveRecord::Migration[7.0]
  def change
    create_table :super_tokens do |t|
      t.string :token, uniqueness: true
      t.datetime :expiry
      t.integer :user_id
      t.string :agent
      t.string :client_ip
      t.boolean :is_sms, default: false
      t.timestamps
    end
  end
end

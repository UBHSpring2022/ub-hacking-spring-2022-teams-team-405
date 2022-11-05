class CreateChats < ActiveRecord::Migration[7.0]
  def change
    create_table :chats do |t|
      t.integer :user_id
      t.integer :room_id

      t.timestamps
    end
  end
end

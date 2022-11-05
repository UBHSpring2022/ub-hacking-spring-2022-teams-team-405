class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.integer :user_id
      t.integer :room_id
      t.string :content

      t.timestamps
    end
  end
end

class CreateRooms < ActiveRecord::Migration[7.0]
  def change
    create_table :rooms do |t|
      t.boolean :is_open
      t.integer :product_id
      t.timestamps
    end
  end
end

class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name
      t.string :price
      t.integer :user_id
      t.boolean :is_active, default: true

      t.timestamps
    end
  end
end

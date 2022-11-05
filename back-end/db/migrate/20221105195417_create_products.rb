class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name
      t.string :breed
      t.string :age
      t.string :price
      t.integer :user_id

      t.timestamps
    end
  end
end

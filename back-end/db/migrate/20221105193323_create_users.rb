class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :display_name
      t.string :email
      t.string :phone
      t.string :password_digest
      t.string :lat
      t.string :long
      t.boolean :sms_verified, default: false
      t.boolean :email_verified, default: false
      t.boolean :is_uncle, default: false

      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :phone, unique: true
  end
end

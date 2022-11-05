class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :display_name
      t.string :email, uniqueness: true
      t.string :phone, uniqueness: true
      t.string :password_digest
      t.string :lat
      t.string :long
      t.boolean :sms_verified, default: false
      t.boolean :email_verified, default: false
      t.boolean :is_uncle

      t.timestamps
    end
  end
end

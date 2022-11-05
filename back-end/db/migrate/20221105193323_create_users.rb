class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :display_name
      t.string :email
      t.string :phone
      t.string :password_digest
      t.string :lat
      t.string :long
      t.boolean :sms_verified
      t.boolean :email_verified
      t.boolean :is_uncle

      t.timestamps
    end
  end
end

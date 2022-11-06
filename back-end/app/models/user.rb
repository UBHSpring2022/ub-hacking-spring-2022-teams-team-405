class User < ApplicationRecord
    has_secure_password
    validates_presence_of :display_name
    validates_presence_of :email
    validates_presence_of :phone
    has_many :super_tokens
    has_many :orders
    has_many :products
    has_many :messages
    has_many :chats
    has_many :rooms, through: :chats
end

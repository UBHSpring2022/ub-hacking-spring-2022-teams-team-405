class User < ApplicationRecord
    has_many :orders
    has_many :products
    has_many :messages
    has_many :chats
    has_many :rooms, through: :chats
end

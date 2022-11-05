class User < ApplicationRecord
    has_secure_password
    validates_presence_of :display_name
    validates_presence_of :email
    validates_uniqueness_of :email
    validates_presence_of :phone
    validates_uniqueness_of :phone
    has_many :supertokens
    has_many :orders
    has_many :products
    has_many :messages
    has_many :chats
    has_many :rooms, through: :chats
end

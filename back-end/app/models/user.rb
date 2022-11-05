class User < ApplicationRecord
    has_secure_password
    validates_presence_of :display_name
    validates_presence_of :email
    validates_uniqueness_of :email
    validates_presence_of :phone
    validates_uniqueness_of :phone
    has_many :supertokens
end

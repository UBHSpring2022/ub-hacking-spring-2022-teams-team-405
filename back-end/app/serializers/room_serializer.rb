class RoomSerializer < ActiveModel::Serializer
  attributes :id,:is_open, :created_at, :updated_at
  belongs_to :product
  has_many :users
  has_many :messages
end


class RoomSerializer < ActiveModel::Serializer
  attributes :is_open, :created_at, :updated_at
  has_many :users
  has_many :messages
end


class OrderSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at
  belongs_to :user
  belongs_to :product
end

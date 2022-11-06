class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name,:image_url,:created_at, :updated_at
  belongs_to :user 
end

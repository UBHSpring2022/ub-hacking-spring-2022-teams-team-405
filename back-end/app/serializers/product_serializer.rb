class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name,:image_url,:price,:created_at, :updated_at
  belongs_to :user 
end

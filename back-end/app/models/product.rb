class Product < ApplicationRecord
    has_many :orders
    belongs_to :user
    has_one_attached :image

    def image_url
        image.url
    end
end

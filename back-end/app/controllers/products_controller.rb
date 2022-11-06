class ProductsController < ApplicationController
    before_action :authorize, only: [:create]
    def index
        render json: Product.all.where(is_active: true) # make limiter
    end

    def show
        render json: Product.find(params[:uuid])
    end

    def create
        product = Product.create!(name: params[:product_name],user_id: @user.id)
        file = params[:file]
        product.image.attach(io: file, filename: params[:file_name], content_type: params[:file_type])
        render json: product
    end
end

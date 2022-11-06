class ProductsController < ApplicationController
    def index
        render json: Product.all # make limiter
    end

    def show
        render json: Product.find(params[:uuid])
    end
end

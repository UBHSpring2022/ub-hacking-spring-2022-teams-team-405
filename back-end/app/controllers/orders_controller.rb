class OrdersController < ApplicationController
    before_action :authorize
    def index
        render json: @user.orders
    end

    def create
        order = Order.create!(user_id: @user.id, product_id: params[:product_id])
        render json: order
    end
end

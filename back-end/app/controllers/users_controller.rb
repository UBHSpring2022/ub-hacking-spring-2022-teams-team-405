class UsersController < ApplicationController
    before_action :authorize
    def index
        if uncle?
            render json: {users: User.all}# make limiter
        else
            render json: {error: "401 Unauthorized", message:"You are not authorized to view this user"},status: :unauthorized
        end
    end
    def show
        if uncle?
            target_user = User.find_by(email: params[:email])
            render json: {sessions: target_user.super_tokens}
        else
            render json: {error: "401 Unauthorized", message:"You are not authorized to view this user"},status: :unauthorized
        end
    end

    private 

    def uncle?
        if @user.is_uncle
            true
        else
            false
        end
    end
end

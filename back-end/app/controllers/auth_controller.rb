class AuthController < ApplicationController
  before_action :authorize, only: [:verify]

  def textme
    render json: {message: "textme"}
  end

  def verify
    render json: @user
  end

  def login
    user_found = User.find_by(email:params[:email]) || User.find_by!(phone:params[:phone])

    user = user_found.try(:authenticate, params[:password])
    if user
        super_token = SuperToken.generate_token(user, request)
        render json: {user:user, token: super_token.token}
    else
        render json: {status:"bad", error: "401 UNAUTHORIZED", message:"Incorrect Password"}, status: 401
    end

  end
  
  def signup
    # create user from params 
    user = User.create!(display_name: params[:display_name], email: params[:email],phone:params[:phone],password: params[:password], lat: params[:lat],long: params[:long])
    supertoken = SuperToken.generate_token(user, request)
    render json: {user:user, token: supertoken.token}
  end

end

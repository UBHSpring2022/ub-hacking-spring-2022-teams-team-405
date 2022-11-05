class AuthController < ApplicationController
  def textme
    render json: {message: "textme"}
  end

  def verify
    render json: {message: "verify"}
  end

  def login
    render json: {message: "login"}
  end
  
  def signup
    render json: {message: "signup"}
  end

end

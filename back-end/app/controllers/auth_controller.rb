class AuthController < ApplicationController
  before_action :authorize, only: [:verify]
  rescue_from Twilio::REST::RestError, with: :twilio_error

  def send_sms
    token = SuperToken.generate_token(@@user, request,true)
    account_sid = ENV['TWILIOACCOUNTSID']
    auth_token = ENV['TWILIOAUTHTOKEN']
    client = Twilio::REST::Client.new(account_sid, auth_token)

    from = "+1#{ENV['TWILIOPHONE']}" # Your Twilio number
    to = "+1#{@@user.phone}" # Your mobile phone number

    client.messages.create(
        from: from,
        to: to,
        body: "Hello #{@@user.display_name},Use this code to verify your account but make sure to hide this from the ZARA employees: #{token.token}"
    )
  end
  def textme
    @@user = User.find_by(email:params[:email]) || User.find_by!(phone:params[:phone])
    if (@@user.sms_verified == true)
      return render json: {message: "You are already verified through SMS"}
    end
    send_sms
    render json: {message: "sent"}
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
    @@user = User.create!(display_name: params[:display_name], email: params[:email],phone:params[:phone],password: params[:password], lat: params[:lat],long: params[:long])
    supertoken = SuperToken.generate_token(@@user, request)
    send_sms
    render json: {user:@@user, token: supertoken.token}
  end

  private
  def twilio_error(exception)
      render json: { status: "bad",error: exception.error_message }, status: 400 
  end
end

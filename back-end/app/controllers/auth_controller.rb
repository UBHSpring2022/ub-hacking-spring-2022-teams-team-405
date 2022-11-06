class AuthController < ApplicationController
  before_action :authorize, only: [:verify,:profile]
  rescue_from Twilio::REST::RestError, with: :twilio_error
  
  SMS_EXPIRY = 10 # in minutes 
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
    if @validated_token.is_sms
      age_of_token = Time.now.to_i - @validated_token.created_at.to_i 
      user = @validated_token.user
      @validated_token.destroy
      if(age_of_token < SMS_EXPIRY*60)
        user.update(sms_verified: true)
         render json: {message:"Verified user"}
      else
         render json: { error:"401 not authorized", message:"EXPIRED SMS TOKEN"}
      end
    else
       render json: { error:"401 not authorized", message:"Not SMS Token type"}
    end
  end
  
  def profile
    render json: @user
  end
  
  def login
    user_found = User.find_by(email:params[:email]) || User.find_by!(phone:params[:phone])

    user = user_found.try(:authenticate, params[:password])
    if user
        super_token = SuperToken.generate_token(user, request)
        render json: {user:UserSerializer.new(user), token: super_token.token}
    else
        render json: {status:"bad", error: "401 UNAUTHORIZED", message:"Incorrect Password"}, status: 401
    end

  end
  
  def signup
    # create user from params 
    @@user = User.create!(display_name: params[:display_name], email: params[:email],phone:params[:phone],password: params[:password], lat: params[:lat],long: params[:long])
    @@supertoken = SuperToken.generate_token(@@user, request)
    send_sms

    return render json: {user:UserSerializer.new(@@user), token: @@supertoken.token}
  end


  def twilio_error(exception)
      render json: { _error: exception.error_message, data:{user:UserSerializer.new(@@user), token: @@supertoken.token} }, status: 400 
  end
end

class ApplicationController < ActionController::API
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotUnique, with: :render_entity_not_unique_response
    

    def authorize
        @verify = SuperToken.vaildate_super request
        if @verify[:user]
            # no errors during vaildation
            @validated_token = @verify[:token] # this line is here so i dont need to run another sql query to find the token entry
            @user = @verify[:user]
        else
            render json: @verify
        end
    end

    private
    def render_not_found_response(exception)
    render json: { error: "#{exception.model} not found"}, status: :not_found
    end
    def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end
    def render_entity_not_unique_response(exception)
        render json: { errors: "An account with that email or phone number already exists, please log in." }, status: :unprocessable_entity
    end
end

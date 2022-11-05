class ApplicationController < ActionController::API
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def authorize
        @verify = SuperToken.vaildate_super request

        if @verify[:user]
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
end

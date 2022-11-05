class MessagesController < ApplicationController
    before_action :authorize, only: [:index]
    def index
        room = Room.find(params[:room_id])
        if room
            if room.users.where(id: @user.id)
                render json: room.messages
            else
                render json: {error: "401 Unauthorized", message:"You are not authorized to view this room"}
            end
        else
            render json: {error: "404 not found", message: "Invalid Room uuid"}, status: :not_found
        end
    end

    def create
                # RoomsChannel.broadcast_to(room, {
        #     messages: room.messages
        # })
        
    end
end

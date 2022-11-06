class MessagesController < ApplicationController
    before_action :authorize
    def index
        room = Room.find(params[:uuid])
        if is_authorized?(room)
            render json: room
            
        else
            render json: {error: "401 Unauthorized", message:"You are not authorized to view this room"},status: :unauthorized
        end
    end

    def create
        room = Room.find(params[:uuid])
        if is_authorized?(room)
            message = Message.create!(user_id: @user.id, room_id: room.id, content: params[:content])
            RoomsChannel.broadcast_to(room, {
                messages: room.messages
            })
        else
            render json: {error: "401 Unauthorized", message:"You are not authorized to view this room"},status: :unauthorized
        end
    end

    private 

    def is_authorized?(room)
        if room.is_open
            if room.users.where(id: @user.id)
                true
            else
               false
            end
        else
            false
        end
    end
end


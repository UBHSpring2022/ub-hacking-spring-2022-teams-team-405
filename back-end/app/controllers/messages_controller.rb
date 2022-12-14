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
                # messages: ActiveModel::SerializableResource.new(room.messagesp)
                # messages: MessageSerializer.new(message)
                room:  RoomSerializer.new(room)
            })
        else
            render json: {error: "401 Unauthorized", message:"You are not authorized to view this room"},status: :unauthorized
        end
    end
end


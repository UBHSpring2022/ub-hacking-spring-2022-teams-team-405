class RoomsController < ApplicationController
    before_action :authorize
    def create
        seller = User.find_by(email: params[:seller_email])
        if seller
            existing_room = Room.find_by(product_id: params[:product_uuid])
            if existing_room
                if existing_room.users.include?(@user) && existing_room.users.include?(seller)
                    render json: {error: "409 Conflict", message:"Room already exists"},status: :conflict
                else
                    room = Room.create!(is_open: true, product_id: params[:product_uuid])
                    Chat.create!(user_id: seller.id, room_id: new_room.id);
                    Chat.create!(user_id: @user.id, room_id: new_room.id);
                    render json: room
                end
            else
                new_room = Room.create!(is_open: true, product_id: params[:product_uuid])
                Chat.create!(user_id: seller.id, room_id: new_room.id);
                Chat.create!(user_id: @user.id, room_id: new_room.id);
                render json: new_room
            end
        else
            render json: {error: "404 Not Found", message:"User not found"},status: :not_found
        end
    end
end

class RoomsChannel < ApplicationCable::Channel
    def subscribed
        @room = Room.find_by(id: params[:room])
        stream_for @room
      end
      def appear
      end
      def unsubscribed
      end
end
class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at, :updated_at,:sender

  def sender
    object.user.email
  end
end

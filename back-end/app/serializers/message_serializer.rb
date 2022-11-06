class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at, :updated_at,:sender,:sender_name

  def sender
    object.user.email
  end
  def sender_name
    object.user.display_name
  end
end

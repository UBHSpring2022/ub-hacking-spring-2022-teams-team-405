class UserSerializer < ActiveModel::Serializer
  attributes :display_name,:sms_verified, :email_verified, :is_uncle
end

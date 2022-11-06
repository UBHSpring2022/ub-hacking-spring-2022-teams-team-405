class UserSerializer < ActiveModel::Serializer
  attributes :display_name,:email,:sms_verified, :email_verified, :is_uncle
end

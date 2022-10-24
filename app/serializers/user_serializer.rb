class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :display_name, :icon
  has_many :chirps

end

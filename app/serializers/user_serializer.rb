class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :display_name, :icon

  def icon
    object.icon_url
  end
end

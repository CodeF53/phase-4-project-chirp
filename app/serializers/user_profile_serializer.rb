class UserProfileSerializer < ActiveModel::Serializer
  attributes :id, :username, :display_name, :icon, :banner, :bio, :birthday, :website, :pinned_chirp_id, :chirp_ids

  def chirp_ids
    object.chirps.map(&:id)
  end
end

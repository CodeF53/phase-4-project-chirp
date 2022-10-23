class ChirpSerializer < ActiveModel::Serializer
  attributes :id, :text, :attachment, :reply_chirp_id, :like_user_ids

  def like_user_ids
    object.likes.map(&:likes)
  end

  has_one :user
end

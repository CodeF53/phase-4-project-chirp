class ChirpSerializer < ActiveModel::Serializer
  attributes :id, :text, :attachment, :reply_chirp_id, :like_user_ids, :reply_chirp, :reply_ids, :has_reply_from_self
  # TODO: include rechirp_ids

  def has_reply_from_self
    object.replies.map(&:user_id).include?(object.user_id)
  end

  def reply_chirp
    if object.reply_chirp_id.nil?
      nil
    else
      chirp = Chirp.find(object.reply_chirp_id)
      ActiveModelSerializers::SerializableResource.new(chirp, { serializer: ChirpSerializer }).as_json
    end
  end

  def reply_ids
    object.replies.map(&:id)
  end

  def like_user_ids
    object.likes.map(&:user_id)
  end

  has_one :user
end

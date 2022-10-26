class ChirpSerializer < ActiveModel::Serializer
  attributes :id, :text, :attachment, :reply_chirp_id, :like_user_ids, :reply_chirp,
             :reply_ids, :has_reply_from_self, :rechirp_user_ids, :rechirp, :images
  # TODO: include rechirp_ids

  def has_reply_from_self
    object.replies.map(&:user_id).include?(object.user_id)
  end

  def reply_chirp
    unless object.reply_chirp_id.nil?
      chirp = Chirp.find(object.reply_chirp_id)
      ActiveModelSerializers::SerializableResource.new(chirp, { serializer: ChirpSerializer }).as_json
    end
  end

  def rechirp
    unless object.rechirp_id.nil?
      ActiveModelSerializers::SerializableResource.new(object.rechirp, { serializer: ChirpSerializer }).as_json
    end
  end

  def reply_ids
    object.replies.map(&:id)
  end

  def like_user_ids
    object.likes.map(&:user_id)
  end

  def rechirp_user_ids
    object.rechirps.map(&:user_id)
  end

  def images
    object.blobs
  end

  has_one :user
end

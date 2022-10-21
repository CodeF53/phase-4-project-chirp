class ChirpSerializer < ActiveModel::Serializer
  attributes :id, :text, :attachment, :reply_chirp_id
  has_one :user
end

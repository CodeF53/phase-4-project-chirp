class Chirp < ApplicationRecord
  belongs_to :user
  has_many :likes

  has_many :replies, class_name: "Chirp", foreign_key: "reply_chirp_id"
end

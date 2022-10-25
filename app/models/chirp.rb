class Chirp < ApplicationRecord
  belongs_to :user
  has_many :likes

  has_many :replies, class_name: 'Chirp', foreign_key: 'reply_chirp_id'

  has_many :rechirps, class_name: 'Chirp', foreign_key: 'rechirp_id', dependent: :delete_all
  belongs_to :rechirp, class_name: 'Chirp', foreign_key: 'rechirp_id', required: false
end

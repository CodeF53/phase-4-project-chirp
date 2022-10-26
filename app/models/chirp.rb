class Chirp < ApplicationRecord
  belongs_to :user

  has_many :likes, dependent: :delete_all

  has_many :replies, class_name: 'Chirp', foreign_key: 'reply_chirp_id', dependent: :delete_all

  belongs_to :rechirp, class_name: 'Chirp', foreign_key: 'rechirp_id', required: false
  has_many :rechirps, class_name: 'Chirp', foreign_key: 'rechirp_id', dependent: :delete_all

  has_many_attached :images

  def image_urls
    images.map { |p| Rails.application.routes.url_helpers.url_for(p) }
  end
end

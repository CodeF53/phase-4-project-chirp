class Chirp < ApplicationRecord
  belongs_to :user
  has_many :likes
end
class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: 16 }
  has_many :chirps

  # ! cursed
  has_many :follows_to_others, class_name: 'Follow', foreign_key: 'follower_id', dependent: :destroy
  has_many :followed_users, through: :follows_to_others, source: :followed_user

  has_many :follows_to_self, class_name: 'Follow', foreign_key: 'user_id'
  has_many :followers, through: :follows_to_self, foreign_key: :follower

  has_many :likes
  has_many :liked_chirps, through: :likes, foreign_key: :chirp
end

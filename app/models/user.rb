class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: 16 }
  has_many :chirps

  # ! cursed
  # TODO: fix
  has_many :follows, class_name: 'follow', foreign_key: 'follower_id'
  has_many :followed_users, through: :follows, source: :followed_user

  # TODO: has same issues as follows has
  has_many :likes
end

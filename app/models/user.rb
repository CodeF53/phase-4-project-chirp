class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: 16 }
  has_many :likes
  has_many :follows
  has_many :chirps
end

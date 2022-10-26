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

  has_one_attached :icon
  has_one_attached :banner

  def icon_url
    return Rails.application.routes.url_helpers.url_for(icon) if icon.attached?

    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIqcwio8gGLw-sSaYm0SYl13oLFpscvutmkk8l95s33AM3_kD0HivHJLzMF_t6w-VI2ow&usqp=CAU'
  end

  def banner_url
    return Rails.application.routes.url_helpers.url_for(banner) if banner.attached?

    'https://i.imgur.com/rgnIigK.png'
  end
end

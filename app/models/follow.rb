class Follow < ApplicationRecord
  # ! cursed
  # TODO: Fix.
  belongs_to :follower, class_name: 'User', foreign_key: 'follower_id'
  belongs_to :followed_user, class_name: 'User', foreign_key: 'user_id'
end

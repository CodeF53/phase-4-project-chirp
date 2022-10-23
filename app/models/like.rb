class Like < ApplicationRecord
  belongs_to :user
  belongs_to :chirp

  # TODO: validation preventing a user from liking the same tweet twice
end

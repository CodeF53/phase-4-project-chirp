class Like < ApplicationRecord
  # TODO: has same issues as follows has
  belongs_to :user
  belongs_to :chirp
end

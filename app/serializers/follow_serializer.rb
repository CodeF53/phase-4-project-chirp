class FollowSerializer < ActiveModel::Serializer
  attributes :id, :follwer_id
  has_one :user
end

class FollowsController < ApplicationController
  before_action :set_follow, only: %i[destroy]

  # POST /follows
  def create
    follow = Follow.create!(follower: @current_user, user_id: params[:user_id])

    render json: follow, status: :created
  end

  # DELETE /follows/1
  def destroy
    follow = Follow.find_by(follower: @current_user.id, user_id: params[:user_id])
    follow.destroy
  end
end

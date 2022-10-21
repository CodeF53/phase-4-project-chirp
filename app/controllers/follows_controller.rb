class FollowsController < ApplicationController
  before_action :set_follow, only: %i[destroy]

  # POST /follows
  def create
    follow = Follow.create!(follow_params)

    render json: follow, status: :created
  end

  # DELETE /follows/1
  def destroy
    Follow.find(params[:id]).destroy
  end

  private

  # Only allow a list of trusted parameters through.
  def follow_params
    params.require(:follow).permit(:follwer_id, :user_id)
  end
end

class LikesController < ApplicationController
  before_action :set_like, only: %i[destroy]

  # POST /likes
  def create
    like = Like.create!(like_params)

    render json: like, status: :created
  end

  # DELETE /likes/1
  def destroy
    Like.find(params[:id]).destroy
  end

  private

  # Only allow a list of trusted parameters through.
  def like_params
    params.require(:like).permit(:user_id, :chirp_id)
  end
end

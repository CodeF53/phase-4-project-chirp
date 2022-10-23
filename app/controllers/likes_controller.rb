class LikesController < ApplicationController
  before_action :set_like, only: %i[destroy]

  # POST /likes
  def create
    if Like.find_by(user_id: @current_user.id, chirp_id: params[:chirp_id])
      return render json: { errors: ['you already liked this chirp'] }, status: :bad_request
    end

    like = Like.create!(user_id: @current_user.id, chirp_id: params[:chirp_id])

    render json: like, status: :created
  end

  # DELETE /likes/1
  def destroy
    like = Like.find_by(user_id: @current_user.id, chirp_id: params[:chirp_id])
    like.destroy
  end
end

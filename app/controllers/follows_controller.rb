class FollowsController < ApplicationController
  # POST /follows
  def create
    return render json: { errors: ['you cant follow yourself'] }, status: :bad_request if @current_user.id == params[:user_id]

    if Follow.find_by(follower: @current_user.id, user_id: params[:user_id])
      return render json: { errors: ['you already followed this user'] }, status: :bad_request
    end

    follow = Follow.create!(follower: @current_user, user_id: params[:user_id])

    render json: follow, status: :created
  end

  # DELETE /follows/1
  def destroy
    follow = Follow.find_by(follower: @current_user.id, user_id: params[:user_id])
    follow.destroy
  end
end

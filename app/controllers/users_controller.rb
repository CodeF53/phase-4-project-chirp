class UsersController < ApplicationController
  skip_before_action :authorize, only: %i[create profile]

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def show
    render json: @current_user
  end

  def profile
    user = User.find_by(username: params[:username])

    render json: user, serializer: UserProfileSerializer
  end

  private

  def user_params
    params.permit(:username, :password, :password_confirmation, :image_url, :bio)
  end
end

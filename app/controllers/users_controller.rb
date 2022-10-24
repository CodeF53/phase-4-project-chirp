class UsersController < ApplicationController
  skip_before_action :authorize, only: %i[create profile]

  def index
    render json: User.all, status: :ok
  end

  def create
    user = User.create!(user_params)
    user.update(display_name: user.username)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def me
    render json: @current_user, status: :ok
  end

  def show
    user = User.find(params[:username])
    render json: user, status: :ok
  end

  def feed
    render json: Chirp.all, status: :ok
  end

  def profile
    user = User.find_by(username: params[:username])
    render json: user, serializer: UserProfileSerializer
  end

  def update
    user = User.find_by(username: params[:username])
    user.update(user_params)
    render json: user, status: :accepted
  end

  private

  def user_params
    params.permit(:username, :password, :password_confirmation, :image_url, :bio)
  end
end

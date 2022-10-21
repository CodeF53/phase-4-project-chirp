class UsersController < ApplicationController
  skip_before_action :authorize, only: :create

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
    user = User.find(params[:id])
    render json: user, status: :ok
  end

  def feed
    render json: Chirp.all, status: :ok 
  end

  private

  def user_params
    params.permit(:username, :password, :password_confirmation, :image_url, :bio)
  end
end

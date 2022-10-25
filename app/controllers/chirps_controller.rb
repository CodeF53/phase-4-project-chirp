class ChirpsController < ApplicationController
  skip_before_action :authorize, only: %i[show]
  before_action :set_chirp, only: %i[show destroy]

  def index
    render json: Chirp.all, status: :ok
  end

  # GET /chirps/1
  def show
    render json: @chirp
  end

  # POST /chirps
  def create
    # TODO: allow all params
    chirp = Chirp.create!(text: params[:text], reply_chirp_id: params[:reply_chirp_id], attachment: params[:attachment], user: @current_user)

    render json: chirp, status: :created
  end

  # DELETE /chirps/1
  def destroy
    return render json: { errors: 'you didnt make this chirp' } if @chirp.user_id != @current_user.id

    @chirp.destroy
  end

  # POST /rechirp/:chirp_id
  def rechirp
    chirp_to_rechirp = Chirp.find(params[:chirp_id])

    if chirp_to_rechirp.rechirps.map(&:user_id).include?(@current_user.id)
      return render json: { errors: 'you have already rechirped this!' }, status: :conflict
    end

    chirp = Chirp.create!(rechirp_id: params[:chirp_id], user: @current_user)
    render json: chirp, status: :created
  end

  def delete_rechirp
    chirp_to_un_rechirp = Chirp.find(params[:chirp_id])

    rechirps_to_remove = chirp_to_un_rechirp.rechirps.select { |rechirp| rechirp.user_id == @current_user.id }

    return render json: { errors: 'you havent rechirped this!' }, status: :conflict if rechirps_to_remove.empty?

    rechirps_to_remove.map(&:destroy)
  end

  # GET /feed
  def feed
    chirps = (@current_user.chirps.map(&:id) + @current_user.followed_users.map(&:chirps).flatten(1).map(&:id))

    render json: chirps.sort.reverse
  end

  # GET /search
  def search
    chirps = (Chirp.all - @current_user.chirps)
    render json: chirps.sort.reverse
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_chirp
    @chirp = Chirp.find(params[:id])
  end
end

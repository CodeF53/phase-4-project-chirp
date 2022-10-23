class ChirpsController < ApplicationController
  skip_before_action :authorize, only: %i[show]
  before_action :set_chirp, only: %i[show destroy]

  # GET /chirps/1
  def show
    render json: @chirp
  end

  # POST /chirps
  def create
    chirp = Chirp.create!(chirp_params, user_id: @current_user.id)

    render json: chirp, status: :created
  end

  # DELETE /chirps/1
  def destroy
    return render json: { errors: 'you didnt make this chirp' } if @chirp.user_id != @current_user.id

    @chirp.destroy
  end

  # GET /feed
  def feed
    chirps = (@current_user.chirps.map(&:id) + @current_user.followed_users.map(&:chirps).flatten(1).map(&:id))

    render json: chirps.sort.reverse
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_chirp
    @chirp = Chirp.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def chirp_params
    params.require(:chirp).permit(:text, :attachment, :reply_chirp_id)
  end
end

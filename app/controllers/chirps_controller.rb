class ChirpsController < ApplicationController
  skip_before_action :authorize, only: %i[show]
  before_action :set_chirp, only: %i[show destroy]

  # GET /chirps/1
  def show
    render json: @chirp
  end

  # POST /chirps
  def create
    @chirp = Chirp.create!(chirp_params)

    render json: @chirp, status: :created, location: @chirp
  end

  # ? maybe make tweets editable?
  # # PATCH/PUT /chirps/1
  # def update
  #   if @chirp.update(chirp_params)
  #     render json: @chirp
  #   else
  #     render json: @chirp.errors, status: :unprocessable_entity
  #   end
  # end

  # DELETE /chirps/1
  def destroy
    @chirp.destroy
  end

  # GET /feed
  def feed
    # TODO: once follows relations are fixed uncomment this next line
    render json: @current_user.chirps.map(&:id).sort.reverse # + @current_user.followed_users.chirps.map(&:id)
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

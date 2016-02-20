class Api::V1::MeasurementsController < ApiController
  include TimeParser

  before_action :user
  before_action :measurement, except: [:index, :create]
  before_action :parse_time, only: [:create, :update]

  def index
    @measurements = @user.measurements
  end

  def create
    @measurement = @user.measurements.new(measurement_params)
    if @measurement.save
      render :measurement
    else
      render json: {errors: @measurement.errors.full_messages}
    end
  end

  def update
    if @measurement.update(measurement_params)
      render :measurement
    else
      render json: {errors: @measurement.errors.full_messages}
    end
  end

  def destroy
    @measurement.destroy
    head :ok
  end

  private
    def measurement_params
      params.require(:measurement).permit(:weight, :chest, :right_bicep, :left_bicep,
                                          :neck, :waist, :right_thigh, :left_thigh,
                                          :right_calf, :left_calf, :fat_percent, :notes,
                                          :ozone_challenge)
    end

    def user
      @user = User.find(params[:user_id])
    end

    def measurement
      @measurement = @user.measurements.find(params[:id])
    end

    def parse_time
      params[:measurement][:ozone_challenge] = TimeParser.string_to_minutes(params[:measurement][:ozone_challenge])
    end
end

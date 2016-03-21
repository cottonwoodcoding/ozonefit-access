class Api::V1::MeasurementsController < ApiController
  before_action :user
  before_action :measurement, except: [:index, :create]

  def index
    @measurements = @user.measurements.order(:created_at)
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
      params.require(:measurement).permit(:weight, :chest, :left_bicep,
                                          :neck, :waist, :left_thigh, 
                                          :left_calf, :fat_percent, :notes)
    end

    def user
      @user = User.find(params[:user_id])
    end

    def measurement
      @measurement = @user.measurements.find(params[:id])
    end
end

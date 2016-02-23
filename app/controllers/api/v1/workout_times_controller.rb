class Api::V1::WorkoutTimesController < ApiController
  before_action :workout
  before_action :set_date, only: :create

  def create
    @workout_time = current_user.workout_times.new(workout_time_params)
    set_ozf
    if @workout_time.save
      render 'workout_time'
    else
      render json: {errors: @workout_time.errors}
    end
  end

  def validate_time
    if params[:time].to_i >= @workout.min_time
      render json: {valid: true}
    else
      render json: {valid: false}
    end
  end

  private
    def workout_time_params
      params.require(:workout_time).permit(:date, :time, :ozone_challenge)
    end

    def workout
      @workout = Workout.find(params[:workout_id])
    end

    def set_date
      params[:workout_time][:date] = Date.today.to_s unless params[:workout_time][:date]
    end

    def set_ozf
      @workout_time.ozf = true if params[:workout_time][:time].to_i <= @workout.ozf_time
    end
end

class Api::V1::WorkoutTimesController < ApiController
  def create
    params[:workout_time][:date] = Date.today.to_s unless params[:workout_time][:date]
    @workout_time = current_user.workout_times.new(workout_time_params)
    if @workout_time.save
      render 'workout_time'
    else
      render json: {errors: @workout_time.errors}
    end
  end

  private
    def workout_time_params
      params.require(:workout_time).permit(:date, :time, :ozone_challenge)
    end
end

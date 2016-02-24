class Api::V1::DaysController < ApiController
  before_action :day, except: :index

  def index
    @days = Day.all.order(:id)
  end

  def show
  end

  def set_workout
    @day.update(workout_id: params[:workout_id])
    head :ok
  end

  private
    def day
      @day = Day.find(params[:id])
    end
end

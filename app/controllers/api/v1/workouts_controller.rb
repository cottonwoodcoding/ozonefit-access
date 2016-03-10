class Api::V1::WorkoutsController < ApiController
  include TimeParser
  include WorkoutMovesCalculator

  before_action :day, except: :workout_moves
  before_action :parse_time, only: [:create, :update]
  
  def index
    @workouts = @day.workouts
  end

  def create
    @workout = @day.workouts.new(workout_params)
    params[:moves].keys.each do |key|
      params_move = params[:moves][key]
      @workout.moves << Move.find(params_move['id'])
      @workout.workout_moves.last.update(reps: params_move['reps'])
    end
    if @workout.save
      render :workout
    else
      render json: {errors: @day.errors.full_messages}
    end
  end

  def update
    if @workout.update(workout_params)
      render :workout
    else
      render json: {errors: @workout.errors.full_messages}
    end
  end

  def destroy
    @day.workouts.find(params[:id]).destroy
    head :ok
  end

  def moves
    moves = []
    workout = @day.workouts.find(@day.workout_id)
    render json: WorkoutMovesCalculator.calcuate_moves(workout)
  end

  def workout_moves
    moves = []
    params[:workout][:moves].values.each do |move|
      move[:workout_moves].each do |workout_move|
        workout_move = workout_move.last
        moveData = {id: workout_move[:id], name: move[:name], reps: workout_move[:reps]} if workout_move[:workout_id] == params[:workout][:id]
        if moveData && !moves.include?(moveData)
          moves << moveData
          break
        end
      end
    end
    render json: moves
  end

  private
    def day
      @day = Day.find(params[:day_id])
    end

    def workout_params
      params.require(:workout).permit(:min_time, :ozf_time, :rounds)
    end

    def parse_time
      params[:workout][:min_time] = TimeParser.string_to_minutes(params[:workout][:min_time])
      params[:workout][:ozf_time] = TimeParser.string_to_minutes(params[:workout][:ozf_time])
    end
end

class Api::V1::WorkoutsController < ApiController
  include TimeParser

  before_action :day, except: :workout_moves
  before_action :parse_time, only: [:create, :update]
  
  def index
    @workouts = @day.workouts
  end

  def create
    @workout = @day.workouts.new(workout_params)
    params[:moves].values.each do |move|
      move[:url] = Move.find(move[:id]).url
      @workout.workout_moves << move
    end
    if @workout.save
      render :workout
    else
      render json: {errors: @day.errors.full_messages}
    end
  end

  def update
    @workout = Workout.find(params[:id])
    if move = params[:workout_move]
      move_url = Move.find(move[:id]).url
      @workout.workout_moves << {id: move[:id], reps: move[:reps], 
                                 name: move[:name], url: move_url}
    elsif move_index = params[:move_index]
      @workout.workout_moves = @workout.workout_moves.select.with_index do |move, index|
        move if move_index.to_i != index
      end
    end 
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

  private
    def day
      @day = Day.find(params[:day_id])
    end

    def workout_params
      params.require(:workout).permit(:min_time, :ozf_time, :rounds, :notes, :name)
    end

    def parse_time
      unless params[:workout_move] || params[:move_index]
        params[:workout][:min_time] = TimeParser.string_to_minutes(params[:workout][:min_time])
        params[:workout][:ozf_time] = TimeParser.string_to_minutes(params[:workout][:ozf_time])
      end
    end
end

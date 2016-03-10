module WorkoutMovesCalculator
  extend ActiveSupport::Concern

  def self.calcuate_moves(workout)
    moves = []
    workout.moves.each do |move|
      move.workout_moves.each do |workout_move|
        moveData = {id: workout_move.id, name: move.name, reps: workout_move.reps, url: move.url} if workout_move.workout_id == workout.id
        if moveData && !moves.include?(moveData)
          moves << moveData
          break
        end
      end
    end
    {workout_moves: moves, rounds: workout.rounds}
  end

end
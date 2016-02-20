class AddWorkoutMovesTable < ActiveRecord::Migration
  def change
    create_table(:workout_moves) do |t|
      t.belongs_to :workout
      t.belongs_to :move
      t.string :reps
    end
  end
end

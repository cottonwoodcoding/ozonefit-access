class AddCurrentWorkoutIdToDays < ActiveRecord::Migration
  def change
    add_column :days, :workout_id, :integer
  end
end

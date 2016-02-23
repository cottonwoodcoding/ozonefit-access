class AddOzfBooleanToWorkoutTimes < ActiveRecord::Migration
  def change
    add_column :workout_times, :ozf, :boolean, default: false
  end
end

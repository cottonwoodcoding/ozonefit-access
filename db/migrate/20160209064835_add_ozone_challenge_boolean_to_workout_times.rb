class AddOzoneChallengeBooleanToWorkoutTimes < ActiveRecord::Migration
  def change
    add_column :workout_times, :ozone_challenge, :boolean, default: false
  end
end

class AddOzfTimeToWorkouts < ActiveRecord::Migration
  def change
    add_column :workouts, :ozf_time, :integer
  end
end

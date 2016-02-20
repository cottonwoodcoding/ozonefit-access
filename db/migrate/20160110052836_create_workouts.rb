class CreateWorkouts < ActiveRecord::Migration
  def change
    create_table :workouts do |t|
      t.integer :min_time
      t.belongs_to :day
      t.integer :rounds

      t.timestamps null: false
    end
  end
end

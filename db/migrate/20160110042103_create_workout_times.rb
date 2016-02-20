class CreateWorkoutTimes < ActiveRecord::Migration
  def change
    create_table :workout_times do |t|
      t.date :date, default: Date.today.to_s, null: false
      t.integer :time, default: 0, null: false
      t.belongs_to :user

      t.timestamps null: false
    end
  end
end

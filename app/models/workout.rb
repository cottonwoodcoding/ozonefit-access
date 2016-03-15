class Workout < ActiveRecord::Base
  belongs_to :day
  serialize :workout_moves, Array
end

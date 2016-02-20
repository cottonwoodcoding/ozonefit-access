class WorkoutMove < ActiveRecord::Base
  belongs_to :workout
  belongs_to :move
end

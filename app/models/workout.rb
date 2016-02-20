class Workout < ActiveRecord::Base
  belongs_to :day
  has_many :workout_moves, dependent: :destroy
  has_many :moves, through: :workout_moves
end

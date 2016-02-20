class Move < ActiveRecord::Base
  validates_presence_of :name, :url
  validates_uniqueness_of :name, :url
  has_many :workout_moves, dependent: :destroy
  has_many :workouts, through: :workout_moves
end

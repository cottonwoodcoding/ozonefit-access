class Day < ActiveRecord::Base
  has_many :workouts, dependent: :destroy
  validates_uniqueness_of :name
end

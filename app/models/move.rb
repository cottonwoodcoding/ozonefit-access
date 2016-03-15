class Move < ActiveRecord::Base
  validates_presence_of :name, :url
  validates_uniqueness_of :name, :url
  after_update :update_workouts

  private
    def update_workouts
      Workout.find_each do |workout|
        workout.workout_moves.each do |workout_move|
          next unless workout_move[:id].to_i == self.id
          workout_move[:name] = self.name
          workout_move[:url] = self.url
        end
        workout.save
      end
    end
    handle_asynchronously :update_workouts
end

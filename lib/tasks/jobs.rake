namespace :jobs do
  desc "Sets the current workout id on the day. Should be run at midnight every night."
  task set_workout: :environment do
    day = Day.find(Date.today.wday)
    if day.workouts.any?
      while true
        workout_id = random_workout_id(day)
        if day.workout_id != workout_id
          day.update(workout_id: workout_id)
          break
        end
      end
      puts "#{day.name.pluralize} workout has been set to id: #{day.workout_id}"
    else
      puts "No workouts for today"
    end
  end

  private
    def random_workout_id(day)
      day.workouts.pluck(:id).sample
    end
end

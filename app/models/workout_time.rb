class WorkoutTime < ActiveRecord::Base
  belongs_to :user

  def formatted_time
    Time.at(self.time).utc.strftime("%M:%S")
  end
end

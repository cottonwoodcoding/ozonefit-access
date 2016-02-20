class WorkoutTime < ActiveRecord::Base
  belongs_to :user

  def formatted_time
    if self.time >= 60
      "#{(self.time / 60)}:00"
    else
      if self.time > 10
        "0:#{self.time}"
      else
        "0:0#{self.time}"
      end
    end
  end
end

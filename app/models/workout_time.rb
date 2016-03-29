class WorkoutTime < ActiveRecord::Base
  belongs_to :user

  def formatted_time
    Time.at(self.time).utc.strftime("%M:%S")
  end

  def self.by_current_year(ozone_challenge = false)
    where('extract(year from date) = ? AND ozone_challenge = ?', Date.today.year, ozone_challenge)
  end

  def self.most_recent
    order(date: :desc)
  end

end

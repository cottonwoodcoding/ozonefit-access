module TimeParser
  extend ActiveSupport::Concern

  def self.string_to_minutes(string_time)
    min_time = string_time.split(':')
    ((min_time[0].to_i * 60) + min_time[1].to_i)
  end

  def self.format_time(time)
    Time.at(time).utc.strftime("%M:%S")
  end
end
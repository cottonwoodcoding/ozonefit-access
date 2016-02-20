class Measurement < ActiveRecord::Base
  belongs_to :user

  def self.formatted_time(time)
    if time >= 60
      "#{(time / 60)}:00"
    else
      if time > 10
        "0:#{time}"
      else
        "0:0#{time}"
      end
    end
  end
end

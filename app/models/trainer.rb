class Trainer < ActiveRecord::Base
  validates_presence_of :name, :intro_video_url
end

class DashboardController < ApplicationController  
  def index
    @video_url = SoundCloud.random
    @motivation = Motivation.all.try(:sample)
    @current_day = Day.find(Date.today.wday)
  end
end

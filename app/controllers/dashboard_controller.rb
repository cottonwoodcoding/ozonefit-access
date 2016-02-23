class DashboardController < ApplicationController  
  include TimeParser

  def index
    @video_url = SoundCloud.random
    @motivation = Motivation.all.try(:sample)
    @current_day = Day.find(Date.today.wday)
    @workout =  Workout.find_by(id: @current_day.workout_id)
    if @workout
      @workout_min = TimeParser.format_time(@workout.min_time)
      @workout_ozf = TimeParser.format_time(@workout.ozf_time)
    end
  end
end

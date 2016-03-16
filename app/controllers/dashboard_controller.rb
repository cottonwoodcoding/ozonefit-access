class DashboardController < ApplicationController  
  include TimeParser

  def index
    if current_user.initial_ochallenge_completed && !current_user.admin
      @video_url = SoundCloud.random
      @motivation = Motivation.all.try(:sample)
      @current_day = Day.find(Date.today.wday)
      @workout =  Workout.find_by(id: @current_day.workout_id)
      if @workout
        @workout_min = TimeParser.format_time(@workout.min_time)
        @workout_ozf = TimeParser.format_time(@workout.ozf_time)
      end
    else
      flash[:error] = 'You need to complete an initial O.Zone Challenge!'
      redirect_to challenge_path
    end
  end
end

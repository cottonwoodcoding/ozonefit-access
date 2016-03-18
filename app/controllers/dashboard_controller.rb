class DashboardController < ApplicationController  
  include TimeParser
  before_action :force_ozone_challenge

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

  def policies
  end

  private
    def force_ozone_challenge
      unless current_user.admin
        unless current_user.initial_ochallenge_completed
          flash[:error] = 'You need to complete an initial O.Zone Challenge!'
          redirect_to(challenge_path) and return
        end
      end
    end
end

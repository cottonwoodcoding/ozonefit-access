class OzoneChallengeController < ApplicationController
  def show
    @workout = Workout.first
    @workout_min = TimeParser.format_time(@workout.min_time)
    @workout_ozf = TimeParser.format_time(@workout.ozf_time)
    @video_url = SoundCloud.random
    @motivation = Motivation.all.try(:sample)
  end
end

class OzoneChallengeController < ApplicationController
  def show
    workout = Workout.first
    data = WorkoutMovesCalculator.calcuate_moves(workout)
    @workout_moves = data[:workout_moves]
    @rounds = data[:rounds]
    @workout_min = TimeParser.format_time(workout.min_time)
    @workout_ozf = TimeParser.format_time(workout.ozf_time)
    @video_url = SoundCloud.random
    @motivation = Motivation.all.try(:sample)
  end
end

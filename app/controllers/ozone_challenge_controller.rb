class OzoneChallengeController < ApplicationController
  def show
    workout = Workout.first
    @workout = {id: workout.id, rounds: workout.rounds, moves: []}
    @workout_min = TimeParser.format_time(workout.min_time)
    @workout_ozf = TimeParser.format_time(workout.ozf_time)
    @video_url = SoundCloud.random
    @motivation = Motivation.all.try(:sample)
    workout.moves.each do |move|
      @workout[:moves] << {id: move.id, name: move.name,
                           url: move.url, workout_moves: move.workout_moves.where(workout_id: workout.id)}

    end
  end
end

class OzoneChallengeController < ApplicationController
  def show
    workout = Workout.first
    @workout = {id: workout.id, min_time: workout.min_time, rounds: workout.rounds, moves: []}
    @video_url = SoundCloud.random
    @motivation = Motivation.all.try(:sample)
    workout.moves.each do |move|
      @workout[:moves] << {id: move.id, name: move.name,
                           url: move.url, workout_moves: move.workout_moves.where(workout_id: workout.id)}

    end
  end
end

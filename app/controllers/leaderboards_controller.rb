class LeaderboardsController < ApplicationController
  include TimeParser

  def index
    @leaderboards = Hash.new {|key, value| key[value] = []}
    WorkoutTime.where('extract(year from date) = ? AND ozone_challenge = ?', Date.today.year, params.has_key?(:ozone_challenge)).each do |wt|
      @leaderboards[wt.date] << {workout_time: wt.formatted_time, user: wt.user, avatar_url: wt.user.profile.avatar.url, ozf: wt.ozf }
    end
  end
end

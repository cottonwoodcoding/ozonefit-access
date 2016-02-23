class LeaderboardsController < ApplicationController
  def index
    @leaderboards = Hash.new {|key, value| key[value] = []}
    WorkoutTime.where('extract(year from date) = ? AND ozone_challenge = ?', Date.today.year, false).each do |wt|
      @leaderboards[wt.date] << {workout_time: wt, user: wt.user, avatar_url: wt.user.profile.avatar.url }
    end
  end
end

class Api::V1::LeaderboardController < ApiController
  def index
    leaders = []
    if params.has_key?(:ozone_challenge)
      top_workout_times = WorkoutTime.where(date: Date.today, ozone_challenge: true).order(:time)
    else
      top_workout_times = WorkoutTime.where(date: Date.today, ozone_challenge: false).order(:time).limit(5)
    end
    top_workout_times.each do |twt|
      user = twt.user
      leaders << {id: user.id, profile_url: user.profile.avatar.url(:thumb), time: twt.formatted_time, name: user.name}
    end
    render json: {leaders: leaders}
  end
end

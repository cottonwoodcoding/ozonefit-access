json.workouts @workouts do |workout|
  json.(workout, :id, :min_time, :ozf_time, :rounds, :workout_moves)
  json.url api_v1_day_workout_url(workout.day, workout)
end
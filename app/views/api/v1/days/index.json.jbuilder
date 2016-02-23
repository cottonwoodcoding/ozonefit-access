json.days @days do |day|
  json.(day, :id, :name, :workout_id)
  json.url api_v1_day_url(day)
  json.workoutCount day.workouts.count
end
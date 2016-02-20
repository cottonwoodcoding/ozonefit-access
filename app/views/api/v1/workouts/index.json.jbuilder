json.workouts @workouts do |workout|
  json.(workout, :id, :min_time, :rounds)
  json.url api_v1_day_workout_url(workout.day, workout)
  json.moves workout.moves
  json.moves workout.moves do |move|
    json.id move.id
    json.name move.name
    json.workout_moves move.workout_moves
  end
end
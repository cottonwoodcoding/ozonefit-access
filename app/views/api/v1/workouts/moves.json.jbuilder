json.url api_v1_day_workout_url(@workout.day, @workout)
json.moves @workout.moves do |move|
  json.name move.name
  json.id move.id
  json.workout_moves move.workout_moves
  json.url move.url
end
json.rounds @workout.rounds
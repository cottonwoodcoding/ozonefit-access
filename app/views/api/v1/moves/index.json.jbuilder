json.moves @moves do |move|
  json.id move.id
  json.name move.name
  json.url move.url
  json.workout_moves move.workout_moves
end
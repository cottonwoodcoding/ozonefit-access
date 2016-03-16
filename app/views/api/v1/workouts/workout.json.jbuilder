json.(@workout, :id, :min_time, :ozf_time, :rounds, :workout_moves, :name, :notes)
json.url api_v1_day_workout_url(@workout.day, @workout)
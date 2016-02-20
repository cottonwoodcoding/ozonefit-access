json.(@day, :id, :name)
json.url api_v1_day_url(@day)
json.workoutCount @day.workouts.count
json.measurements @measurements do |measurement|
  json.(measurement, :id, :weight, :chest, 
                    :right_bicep, :left_bicep,
                    :neck, :waist, :right_thigh, 
                    :left_thigh, :right_calf, :left_calf, 
                    :fat_percent)
  json.created_at measurement.created_at.strftime('%D')
  json.ozone_challenge Measurement.formatted_time(measurement.ozone_challenge)
  json.url api_v1_user_measurement_url(measurement.user, measurement)
end
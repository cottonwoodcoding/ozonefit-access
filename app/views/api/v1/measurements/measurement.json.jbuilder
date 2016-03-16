json.(@measurement, :id, :weight, :chest, 
                    :left_bicep, :neck, :waist, 
                    :left_thigh, :left_calf, 
                    :fat_percent)
json.created_at @measurement.created_at.strftime('%D')
json.url api_v1_user_measurement_url(@measurement.user, @measurement)
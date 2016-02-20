json.sound_clouds @sound_clouds do |sound_cloud|
  json.(sound_cloud, :id, :name, :url)
  json.api_url api_v1_sound_cloud_url(sound_cloud)
end
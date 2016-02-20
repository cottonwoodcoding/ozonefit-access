if Rails.env.development?
  ENV['app_url'] = 'http://localhost:3001'
end
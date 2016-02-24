if Rails.env.development?
  begin
    YAML.load(File.read('config/email.yml')).each do |key, value|
      ENV[key] = value
    end
  rescue
    raise "No Email Config Found."
  end
end
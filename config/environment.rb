# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Rails.application.initialize!

ActionMailer::Base.smtp_settings = {
  :address => "smtp.sendgrid.net",
  :port => 25,
  :domain => "ozonefitaccess.com",
  :authentication => :plain,
  :user_name => ENV['SENDGRID_EMAIL'],
  :password => ENV['SENDGRID_PASSWORD']
}

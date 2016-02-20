class UserMailer < ApplicationMailer
  include SendGrid

  def send_user_creation_notification(user, password_token)
    attachments.inline['logo.png'] = File.read("#{Rails.root}/app/assets/images/ozone-fit-website-logo.png")
    @email = user.email
    @password_token = password_token
    mail(:to => user.email, :subject => "You have been added to Ozone Fit Access!")
  end
end

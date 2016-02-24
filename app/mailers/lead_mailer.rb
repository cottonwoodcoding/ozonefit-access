class LeadMailer < ApplicationMailer
  include SendGrid

  def send_lead_email(first_name, last_name, phone, email, body)
    attachments.inline['logo.png'] = File.read("#{Rails.root}/app/assets/images/ozone-fit-website-logo.png")
    @email = email
    @first_name = first_name
    @last_name = last_name
    @phone = phone
    @body = body
    mail(:to => ENV['mail_to'], :subject => "#{first_name} #{last_name} Is Interested In O.ZoneFit Access!")
  end
end

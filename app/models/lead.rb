class Lead < ActiveRecord::Base
  after_create :send_lead_email

  def send_lead_email
    LeadMailer.delay.send_lead_email(self.first_name, self.last_name,
                                     self.phone_number, self.email, self.body)
  end
end

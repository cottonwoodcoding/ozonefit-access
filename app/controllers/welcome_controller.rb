class WelcomeController < ApplicationController
  layout 'welcome'
  skip_before_action :authenticate_user!
  
  def index
    @lead = Lead.new
    if user_signed_in?
      redirect_to(dashboard_path) and return
    end
  end
end

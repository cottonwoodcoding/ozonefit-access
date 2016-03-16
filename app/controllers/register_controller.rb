class RegisterController < ApplicationController
  skip_before_action :authenticate_user!
  
  def show
    if user_signed_in?
      flash[:error] = "You are alredy registered and signed in."
      redirect_to dashboard_path
    end
  end
end

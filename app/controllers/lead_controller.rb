class LeadController < ApplicationController
  def create
    if Lead.create(lead_params)
      flash[:notice] = "Thanks for your interest. We will get back to you as soon as we can."
    else
      flash[:error] = "Something went wrong. Please try again."
    end
    redirect_to :root
  end

  def lead_params
    params.require(:lead).permit(:first_name, :last_name, :phone_number, :email, :body)
  end
end

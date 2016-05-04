class AdminController < ApplicationController
  before_action :authorize

  def show
    @revenue = User.calculate_revenue
    @active_users = User.where(workflow_state: 'active').order(:last_name)
    @inactive_users = User.where(workflow_state: 'inactive').order(:last_name)
    @days = Day.all
    @workouts = Workout.all
    @moves = Move.all
  end

  def send_password_resets
  end

  def generate_new_password_email
    user = User.find(params[:format]) 
    user.send_reset_password_instructions 
    flash[:notice] = "Reset password instructions have been sent to #{user.email}." 
    redirect_to send_password_resets_path
  end

  private
    def authorize
      unless current_user.admin || current_user.trainer
        flash[:error] = "You are not authorized to view that page."
        redirect_to root_path
      end
    end
end

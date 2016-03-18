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

  private
    def authorize
      unless current_user.admin || current_user.trainer
        flash[:error] = "You are not authorized to view that page."
        redirect_to root_path
      end
    end
end

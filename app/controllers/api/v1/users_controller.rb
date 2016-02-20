class Api::V1::UsersController < ApplicationController
  before_action :user, except: [:index, :create, :search]

  def index
    @users = User.where(workflow_state: params[:workflow_state]).order(:last_name)
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render :user
    else
      render json: {errors: @user.errors.full_messages}
    end
  end

  def update
    if @user.update(user_params)
      render :user
    else
      render json: {errors: @user.errors.full_messages}
    end
  end

  def destroy
    if(params[:user].has_key?(:workflow_state))
      @user.update(user_params)
      render :user
    else
      @user.destroy
      head :ok
    end
  end

  def search
    term = params[:term]
    @users = User.where('lower(first_name) ILIKE ? OR lower(last_name) ILIKE ? OR lower(email) ILIKE ?', "%#{term}%", "%#{term}%", "%#{term}%")
    @users = User.all if @users.count == 0
    render :index
  end

  private
    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :workflow_state)
    end

    def user
      @user = User.find(params[:id])
    end
end

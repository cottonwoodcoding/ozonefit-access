class Api::V1::ProfileController < ApiController
  def update
    if current_user.update(user_params)
      sign_in(current_user, :bypass => true) if params[:password]
      render json: {user: current_user.reload}
    else
      render json: {errors: current_user.errors.full_messages.join(',')}, status: 500
    end
  end

  def upload_avatar
    if current_user.profile.update(profile_params)
      render json: {avatar_url: current_user.profile.avatar.url}
    else
      render json: {errors: current_user.profile.errors.full_messages.join(',')}, status: 500
    end
  end

  private
    def profile_params
      params.require(:profile).permit(:avatar)
    end

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :phone, :password, :password_confirmation)
    end
end

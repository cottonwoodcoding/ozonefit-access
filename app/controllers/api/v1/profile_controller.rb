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
      render json: {avatar_url: current_user.profile.avatar.url(:thumb)}
    else
      render json: {errors: current_user.profile.errors.full_messages.join(',')}, status: 500
    end
  end

  
  def measurements
    render json: {measurements: [{id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 {id: rand(1000), date: Date.today.strftime('%a %b %e %Y'), rightBicep: 10, leftBicep: 10, rightThigh: 11, leftThigh: 12, weight: 180, bodyFatPercentage: '8%', waist: 32, chestBack: 22, hips: 10, calves: 8},
                                 ]}
  end

  private
    def profile_params
      params.require(:profile).permit(:avatar)
    end

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end
end

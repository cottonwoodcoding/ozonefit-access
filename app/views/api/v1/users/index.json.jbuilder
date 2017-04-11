json.users @users do |user|
  json.(user, :id, :first_name, :last_name, :email, :phone, :workflow_state, :trainer)
  json.created_at user.created_at.strftime('%m-%d-%Y')
  json.url api_v1_user_url(user)
end
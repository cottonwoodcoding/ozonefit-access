json.users @users do |user|
  json.(user, :id, :first_name, :last_name, :email, :phone, :workflow_state)
  json.url api_v1_user_url(user)
end
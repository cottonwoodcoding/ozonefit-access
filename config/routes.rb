Rails.application.routes.draw do
  # Root Route
  root 'welcome#index'

  # Devise Routes (User Auth)
  devise_for :users

  # GET Routes
  get 'dashboard/index', as: 'dashboard'
  get 'profile', to: 'profile#show', as: 'profile'
  get 'admin', to: 'admin#show', as: 'admin'
  get 'nutrition', to: 'nutrition#index', as: 'nutrition_index'
  get 'ozone_challenge', to: 'ozone_challenge#show', as: 'challenge'
  get 'trainers', to: 'trainers#index', as: 'trainers'
  get 'leaders', to: 'leaderboards#index', as: 'leaders'

  # POST Routes
  post 'lead/create', as: 'leads'

  # V1 API
  namespace :api do
    namespace :v1 do
      # Resource Routes
      resources :moves
      resources :sound_clouds
      resources :nutrition, except: :index
      resources :motivations

      # Nested API Routes
      resources :users do 
        resources :measurements
      end
      resources :days do 
        resources :workouts
      end
      
      # GET Routes
      get 'motivations/index'
      get 'search_users', to: 'users#search'
      get 'leaders', to: 'leaderboard#index'
      get 'random_sound_cloud', to: 'sound_clouds#random'
      get 'days/:day_id/workout_moves', to: 'workouts#moves'
      get 'validate_time', to: 'workout_times#validate_time'

      # POST Routes
      post 'log_workout', to: 'workout_times#create'
      post 'add_workout', to: 'workouts#create'
      
      # PUT Routes
      put 'upload_avatar', to: 'profile#upload_avatar'
      put 'update_account', to: 'profile#update'
    end
  end
end

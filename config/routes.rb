Rails.application.routes.draw do
  namespace :api do
  namespace :v1 do
    get 'motivations/index'
    end
  end

  get 'ozone_challenge/show'

  root 'welcome#index'

  devise_for :users

  # GET Routes
  get 'dashboard/index', as: 'dashboard'
  get 'profile', to: 'profile#show', as: 'profile'
  get 'admin', to: 'admin#show', as: 'admin'
  get 'nutrition', to: 'nutrition#index', as: 'nutrition_index'
  get 'ozone_challenge', to: 'ozone_challenge#show', as: 'challenge'

  # POST Routes
  post 'lead/create', as: 'leads'

  namespace :api do
    namespace :v1 do
      # Resource Routes
      resources :moves
      resources :sound_clouds
      resources :nutrition, except: :index
      resources :motivations
      resources :users do
        resources :measurements
      end
      resources :days do
        resources :workouts
      end
      
      # GET Routes
      get 'measurements', to: 'profile#measurements'
      get 'search_users', to: 'users#search'
      get 'leaders', to: 'leaderboard#index'
      get 'random_sound_cloud', to: 'sound_clouds#random'
      get 'days/:day_id/workout_moves', to: 'workouts#moves'

      # POST Routes
      post 'log_workout', to: 'workout_times#create'
      post 'add_workout', to: 'workouts#create'
      
      # PUT Routes
      put 'upload_avatar', to: 'profile#upload_avatar'
      put 'update_account', to: 'profile#update'
    end
  end
end

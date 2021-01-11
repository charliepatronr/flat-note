Rails.application.routes.draw do
  resources :notes
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # get '/current_user', to: 'auth#show'

  post '/auth', to: 'auth#create'
  get '/current_user', to: 'auth#show'
  get  '/auth/:provider/callback', to: 'auth#omniauth'
  post '/login/google', to: redirect('/auth/google_oauth2')
  get '/login/google', to: redirect('/auth/google_oauth2')




end

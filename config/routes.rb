Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # ! User LOGIN shit, dont touch, put other routes elsewhere
  post '/signup', to: 'users#create'
  get '/me',      to: 'users#me'
  post '/login',    to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  resources :chirps, only:  %i[create destroy show]

  post   '/likes/:chirp_id', to: 'likes#create'
  delete '/likes/:chirp_id', to: 'likes#destroy'

  resources :follows, only: %i[create destroy]

  post '/rechirp/:chirp_id', to: 'chirps#rechirp'
  delete '/rechirp/:chirp_id', to: 'chirps#delete_rechirp'

  get '/feed', to: 'chirps#feed'
  get 'user/:username', to: 'users#profile' # Basically done
  patch 'user/:username', to: 'users#update'
end

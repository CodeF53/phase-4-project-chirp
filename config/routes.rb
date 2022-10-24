Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # ! User shit, dont touch
  post '/signup', to: 'users#create'
  get '/me',      to: 'users#me'
  post '/login',    to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  resources :chirps, only:  %i[create destroy show]
  resources :likes, only:   %i[create destroy]
  resources :follows, only: %i[create destroy]
  # TODO: rechirps routes

  get '/feed', to: 'chirps#feed'
  get '/user/:username', to: 'users#profile' # Basically done
end

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # ! User shit, dont touch
  post '/signup', to: 'users#create'
  get '/me',      to: 'users#show'
  post '/login',    to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # TODO: integrate user auth with create and destroy
  resources :chirps, only:  %i[create destroy show]
  # TODO: fix relations before integrating auth with these
  resources :likes, only:   %i[create destroy]
  resources :follows, only: %i[create destroy]

  get '/feed', to: 'chirps#feed'
  get '/user/:username', to: 'users#profile' # Basically done
end

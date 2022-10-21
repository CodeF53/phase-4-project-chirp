Rails.application.routes.draw do
  resources :chirps
  resources :likes
  resources :follows
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  post '/signup', to: 'users#create'
  get '/me', to: 'users#me'
  get '/feed', to: 'users#feed'
  get '/users/:id', to: 'users#show'
  get '/users', to: 'users#index'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/feed', to: 'users#feed'
end

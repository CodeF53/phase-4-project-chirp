Rails.application.routes.draw do
  resources :chirps
  resources :likes
  resources :follows
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end

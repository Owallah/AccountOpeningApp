Rails.application.routes.draw do

  resources :transactions, only: [:create]
  resources :users
  post '/auth/login', to: 'sessions#login'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end

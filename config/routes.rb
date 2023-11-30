Rails.application.routes.draw do
  get 'transactions/create'
  get 'sessions/create'
  get 'sessions/destroy'
  resources :users
  post '/auth/login', to: 'sessions#login'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end

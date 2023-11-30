Rails.application.routes.draw do
  get 'transactions/create'
  get 'sessions/create'
  get 'sessions/destroy'
  get 'users/create'
  get 'users/update'
  get 'users/show'
  resources :users
  get 'users/destroy'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end

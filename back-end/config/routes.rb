Rails.application.routes.draw do
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  # Defines the root path route ("/")
  # root "articles#index"

  post "/textme", to: "auth#textme" 
  get "/verify", to: "auth#verify" 
  post "/login", to: "auth#login" 
  post "/signup", to: "auth#signup" 
end

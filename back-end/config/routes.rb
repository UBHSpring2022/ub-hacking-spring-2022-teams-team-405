Rails.application.routes.draw do
  resources :rooms
  resources :chats
  resources :orders
  resources :messages
  resources :products
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  # Defines the root path route ("/")
  # root "articles#index"

  post "/textme", to: "auth#textme" 
  get "/verifyme", to: "auth#verifyme" 
  get "/me", to: "auth#me" 
  post "/login", to: "auth#login" 
  post "/signup", to: "auth#signup" 
end

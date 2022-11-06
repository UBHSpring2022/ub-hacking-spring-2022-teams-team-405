Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  # Defines the root path route ("/")
  # root "articles#index"

  post "/textme", to: "auth#textme" 
  get "/verify", to: "auth#verify" 
  post "/login", to: "auth#login" 
  post "/signup", to: "auth#signup" 
  get "/chat", to: "messages#index"
  post "/send-message", to: "messages#create"
  post "/create-room", to: "rooms#create"
  get "/order-history", to: "orders#index" 
  post "/complete-order", to: "orders#create" 
  get "/products", to: "products#index"
  get "/products/:uuid", to: "products#show"
end

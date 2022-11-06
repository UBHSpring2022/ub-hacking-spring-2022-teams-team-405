Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  # Defines the root path route ("/")
  # root "articles#index"

  post "/textme", to: "auth#textme" 
  get "/verify", to: "auth#verify" 
  get "/profile", to: "auth#profile" 
  post "/login", to: "auth#login" 
  post "/signup", to: "auth#signup" 
  get "/chat", to: "messages#index"
  post "/send-message", to: "messages#create"
end

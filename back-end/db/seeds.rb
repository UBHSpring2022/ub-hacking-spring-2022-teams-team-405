# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'open-uri'

puts "Deleting everything in database"
User.destroy_all
SuperToken.destroy_all 
Room.destroy_all 
Message.destroy_all 

puts "Seeding the ZARA employees"
santo = User.create!(display_name: "Santo", email:"Sa\nto@mozam.com",phone:"9294226244",password: "123", lat: "43",long: "43",sms_verified:false,email_verified:true,is_uncle:true)
mohamed = User.create!(display_name: "Mohamed", email:"mohamed@muflahi.dev",phone:"9294226224",password: "12345", lat: "43",long: "43",sms_verified:true,email_verified:true,is_uncle:true)
mustafa = User.create!(display_name: "Mustafa", email:"mustafa@binalhag.dev",phone:"9294226250",password: "123", lat: "43",long: "43",sms_verified:true,email_verified:true,is_uncle:true)
not_uncle = User.create!(display_name: "Mustafa", email:"test_uncle",phone:"1232131232",password: "123", lat: "43",long: "43",sms_verified:true,email_verified:true,is_uncle:false)

puts "Seeding the ZARA chats"
# product = Product.create!(name: "ZARA T-Shirt", price: 20, description: "A ZARA T-Shirt", user_id: santo.id); # lol
product = Product.create!(name: "ZARA T-Shirt",user_id: santo.id);
product2 = Product.create!(name: "ZARA ",user_id: mustafa.id);


room = Room.create!(is_open: true, product_id: product.id);
Chat.create!(user_id: santo.id, room_id: room.id);
Chat.create!(user_id: mohamed.id, room_id: room.id);
puts "Seeding the ZARA messages"
Message.create!(user_id: santo.id, room_id: room.id, content: "Hello, how can I help you?");

url = "https://images-ext-1.discordapp.net/external/FmGceGg_IfbkFbGFDpQiOihifX4thJDwuAQnumNzJbg/https/himalayanoutback.com/wp-content/uploads/2022/04/Red-Handfish-600x390.jpg"
filename = File.basename(URI.parse(url).path)
file = URI.open(url)
product.image.attach(io: file, filename: filename, content_type: 'image/jpg')
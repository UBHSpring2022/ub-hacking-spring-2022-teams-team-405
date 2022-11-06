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
Product.destroy_all

puts "Seeding the ZARA employees"
santo = User.create!(display_name: "Santo", email:"Santo@mozam.com",phone:"1234",password: "123", lat: "43",long: "43",sms_verified:false,email_verified:true,is_uncle:true)
mohamed = User.create!(display_name: "Mohamed", email:"mohamed@muflahi.dev",phone:"12356",password: "12345", lat: "43",long: "43",sms_verified:true,email_verified:true,is_uncle:true)
mustafa = User.create!(display_name: "Mustafa", email:"mustafa@binalhag.dev",phone:"9294226250",password: "123", lat: "43",long: "43",sms_verified:true,email_verified:true,is_uncle:true)
not_uncle = User.create!(display_name: "Mustafa", email:"test_uncle",phone:"1232131232",password: "123", lat: "43",long: "43",sms_verified:true,email_verified:true,is_uncle:false)

puts "Seeding the ZARA chats"
# product = Product.create!(name: "ZARA T-Shirt", price: 20, description: "A ZARA T-Shirt", user_id: santo.id); # lol
product = Product.create!(name: "ZARA T",price: 250,user_id: santo.id);
product2 = Product.create!(name: "ZARA ", price: 200,user_id: mustafa.id);

room = Room.create!(is_open: true, product_id: product.id);
Chat.create!(user_id: santo.id, room_id: room.id);
Chat.create!(user_id: mohamed.id, room_id: room.id);
puts "Seeding the ZARA messages"
Message.create!(user_id: santo.id, room_id: room.id, content: "Hello, how can I help you?");



image_array = [
    'https://tnaqua.org/app/uploads/2020/05/ID_LakeSturgeon_1200x490-e1594413569807-1200x0-c-default.jpg',
    'https://himalayanoutback.com/wp-content/uploads/2022/04/Smalltooth-Sawfish-600x680.jpg',
    'https://himalayanoutback.com/wp-content/uploads/2022/04/Kissing-Loach-Himalayan-Outback.jpg',
    'https://himalayanoutback.com/wp-content/uploads/2022/04/Giant-Sea-Bass-768x474.jpg',
    'https://himalayanoutback.com/wp-content/uploads/2022/04/Tequila-Splitfin-600x400.jpg',
    'https://himalayanoutback.com/wp-content/uploads/2022/04/Devils-Hole-Pupfish-600x377.jpg',
    'https://himalayanoutback.com/wp-content/uploads/2022/04/Red-Handfish-600x390.jpg',
    'https://himalayanoutback.com/wp-content/uploads/2022/04/Sakhalin-Sturgeon-600x400.jpg',
    'https://himalayanoutback.com/wp-content/uploads/2022/04/Ornate-Sleeper-Ray-1-600x450.jpg',
    'https://a-z-animals.com/media/2022/01/Types-of-rare-fish-American-Paddlefish.jpg',
    'https://a-z-animals.com/media/2022/01/Types-of-rare-fish-Peppermint-Angelfish.jpg',
    'https://fishbase.mnhn.fr/images/thumbnails/jpg/tn_Amcau_u0.jpg',
    'https://fishesofaustralia.net.au/Images/Image/ParagalaxiasJulianusGRA.jpg',
]
puts "Seeding #{image_array.length} products"

# url = "https://tnaqua.org/app/uploads/2020/05/ID_LakeSturgeon_1200x490-e1594413569807-1200x0-c-default.jpg"
# filename = File.basename(URI.parse(url).path)
#     file = URI.open(url)
#     product.image.attach(io: file, filename: filename, content_type: 'image/jpg')

for url in image_array do
    randomName = Faker::Creature::Animal.name 
    new_product = Product.create(name: randomName,user_id: User.all.sample.id, price: rand(123..999));
    filename = File.basename(URI.parse(url).path)
    file = URI.open(url)
    new_product.image.attach(io: file, filename: filename, content_type: 'image/jpg')
    puts "Seeded a product"
end
puts "Finshed seeding"

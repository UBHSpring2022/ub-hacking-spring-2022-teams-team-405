# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Deleting everything in database"
User.destroy_all
SuperToken.destroy_all 

puts "Seeding the ZARA employees"
User.create!(display_name: "Santo", email:"Santo@mozam.com",phone:"9294226244",password: "123", lat: "43",long: "43",sms_verified:true,email_verified:true,is_uncle:true)
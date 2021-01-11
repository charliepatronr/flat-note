# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Note.destroy_all
User.destroy_all


users = []

10.times do 
    users << User.create(name: Faker::Name.name, email: Faker::Internet.email, username: Faker::Internet.username, password:Faker::Internet.password(min_length: 8), age: rand(10..80) )
end 


25.times do 
    Note.create(user_id: User.all.sample.id, title: Faker::Book.title, content: Faker::Books::Lovecraft.paragraph(sentence_count: 5))
end
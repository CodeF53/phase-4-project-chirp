# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
puts "Seeding users"
user_data=[
    {
        username: "elonmusk",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXxxCzrX7ojA98h_3twc19cTEy2KnND6W6cQ&usqp=CAU",
        banner: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/NGC_4414_%28NASA-med%29.jpg/1200px-NGC_4414_%28NASA-med%29.jpg",
        display_name: "Elon Musk",
        bio: "Boring",
        website: "https://www.spacex.com/",
        birthday: 46981697,
        pinned_chirp_id: 1
    },
    {
        username: "cristiano",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/220px-Cristiano_Ronaldo_2018.jpg",
        banner: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Ronaldo_-_Manchester_United_vs_Chelsea.jpg/220px-Ronaldo_-_Manchester_United_vs_Chelsea.jpg",
        display_name: "Cristiano Ronaldo",
        bio: "Portugese footballer",
        website: "https://www.manutd.com/",
        birthday: 476476097,
        pinned_chirp_id: 2
    },
    {
        username: "marthastewart",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Martha_Stewart_%2848926315347%29_%28cropped%29.jpg/220px-Martha_Stewart_%2848926315347%29_%28cropped%29.jpg",
        banner: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F34%2F2022%2F06%2F22%2Fmartha-stewart-snoop-dogg-2000.jpg&q=60",
        display_name: "Martha Stewart",
        bio: "Chef, Author, Media Personality, Entrepreneur, Mother, and Ex-Con",
        website: "https://www.marthastewart.com
        ",
        birthday: -896592703,
        pinned_chirp_id: 3
    }
]

puts "Seeding chirps"
chirp_data=[
    {
       user_id: 1,
       text: "We are going to colonize Mars",
       attachment: "",
       reply_chirp_id: nil, 
       rechirp_id: nil
    },
    {
       user_id: 2,
       text: "I flexed in the mirror for an hour today",
       attachment: "",
       reply_chirp_id: nil, 
       rechirp_id: nil
    },
    {
       user_id: 3,
       text: "Make sure to order my holiday cookbook, link in bio",
       attachment: "",
       reply_chirp_id: nil, 
       rechirp_id: nil
    },
    {
        user_id: 1,
        text: "I'm switching political parties @cristiano",
        attachment: "",
        reply_chirp_id: nil, 
        rechirp_id: nil
     },
     {
        user_id: 2,
        text: "@LionelMessi why did you have to play during my era",
        attachment: "",
        reply_chirp_id: nil, 
        rechirp_id: nil
     },
     {
        user_id: 3,
        text: "@elonmusk my pumpkin cookies will send you to the moon",
        attachment: "",
        reply_chirp_id: nil, 
        rechirp_id: nil
     },
    {
       user_id: 1,
       text: "Why did I spend so much money on these rockets ugh",
       attachment: "",
       reply_chirp_id: 6, 
       rechirp_id: nil
    },
    {
       user_id: 2,
       text: "American politicians disgust me @elonmusk",
       attachment: "",
       reply_chirp_id: 4, 
       rechirp_id: nil
    },
    {
       user_id: 3,
       text: "Vote for me and VP Snoop in 2024",
       attachment: "",
       reply_chirp_id: 8, 
       rechirp_id: nil
    },
]

User.destroy_all
user_data.each do |user| 
    User.create(user)
end

Chirp.destroy_all
chirp_data.each do |chirp|
    Chirp.create(chirp)
end

puts "✅ Done seeding!"
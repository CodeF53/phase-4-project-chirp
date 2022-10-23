class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :display_name, default: :username
      t.string :icon, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIqcwio8gGLw-sSaYm0SYl13oLFpscvutmkk8l95s33AM3_kD0HivHJLzMF_t6w-VI2ow&usqp=CAU"
      t.string :banner, default: "https://i.imgur.com/rgnIigK.png"
      t.string :bio
      t.string :website
      t.integer :birthday
      t.integer :pinned_chirp_id

      t.timestamps
    end
  end
end

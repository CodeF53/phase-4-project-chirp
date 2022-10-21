# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_10_21_170531) do
  create_table "chirps", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "text"
    t.string "attachment"
    t.integer "reply_chirp_id"
    t.datetime "created_at", null: false
    t.index ["user_id"], name: "index_chirps_on_user_id"
  end

  create_table "follows", force: :cascade do |t|
    t.integer "follwer_id"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.index ["user_id"], name: "index_follows_on_user_id"
  end

  create_table "likes", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "chirp_id", null: false
    t.datetime "created_at", null: false
    t.index ["chirp_id"], name: "index_likes_on_chirp_id"
    t.index ["user_id"], name: "index_likes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "display_name"
    t.string "icon"
    t.string "banner"
    t.string "bio"
    t.string "website"
    t.integer "birthday"
    t.integer "pinned_chirp_id"
    t.datetime "created_at", null: false
  end

  add_foreign_key "chirps", "users"
  add_foreign_key "follows", "users"
  add_foreign_key "likes", "chirps"
  add_foreign_key "likes", "users"
end

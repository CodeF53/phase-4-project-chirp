class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :display_name
      t.string :icon
      t.string :banner
      t.string :bio
      t.string :website
      t.integer :birthday
      t.integer :pinned_chirp_id

      t.timestamps
    end
  end
end

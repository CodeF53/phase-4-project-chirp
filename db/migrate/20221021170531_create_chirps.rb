class CreateChirps < ActiveRecord::Migration[7.0]
  def change
    create_table :chirps do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :text
      t.string :attachment
      t.integer :reply_chirp_id

      t.timestamps
    end
  end
end

class CreateFollows < ActiveRecord::Migration[7.0]
  def change
    create_table :follows do |t|
      t.integer :follwer_id
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

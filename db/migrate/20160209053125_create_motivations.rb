class CreateMotivations < ActiveRecord::Migration
  def change
    create_table :motivations do |t|
      t.text :text

      t.timestamps null: false
    end
  end
end

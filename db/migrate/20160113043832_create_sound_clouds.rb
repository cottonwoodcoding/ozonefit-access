class CreateSoundClouds < ActiveRecord::Migration
  def change
    create_table :sound_clouds do |t|
      t.string :name, null: false
      t.string :url, null: false
      
      t.timestamps null: false
    end
  end
end

class AddTrainers < ActiveRecord::Migration
  def change
    create_table(:trainers) do |t|
      t.string :name
      t.string :intro_video_url
      t.boolean :active, default: true

      t.timestamps
    end
  end
end

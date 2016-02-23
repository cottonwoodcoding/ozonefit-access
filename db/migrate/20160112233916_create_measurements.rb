class CreateMeasurements < ActiveRecord::Migration
  def change
    create_table :measurements do |t|
      t.float :weight
      t.float :chest
      t.float :left_bicep
      t.float :neck
      t.float :waist
      t.float :left_thigh
      t.float :left_calf
      t.float :fat_percent
      t.text :notes
      t.belongs_to :user

      t.timestamps null: false
    end
  end
end

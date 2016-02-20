class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.string :city
      t.string :state
      t.string :zip
      t.belongs_to :profile

      t.timestamps null: false
    end
  end
end

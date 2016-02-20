class CreateLeads < ActiveRecord::Migration
  def change
    create_table :leads do |t|
      t.string :first_name
      t.string :last_name
      t.string :phone_number
      t.string :email
      t.text :body

      t.timestamps null: false
    end
  end
end

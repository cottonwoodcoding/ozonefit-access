class AddTrainerBooleanToUsers < ActiveRecord::Migration
  def change
    add_column :users, :trainer, :boolean, default: false
  end
end

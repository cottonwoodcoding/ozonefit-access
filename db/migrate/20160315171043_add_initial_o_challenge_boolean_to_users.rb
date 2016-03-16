class AddInitialOChallengeBooleanToUsers < ActiveRecord::Migration
  def change
    add_column :users, :initial_ochallenge_completed, :boolean, default: false
  end
end

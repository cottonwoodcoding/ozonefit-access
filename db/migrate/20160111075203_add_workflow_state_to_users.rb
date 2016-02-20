class AddWorkflowStateToUsers < ActiveRecord::Migration
  def change
    add_column :users, :workflow_state, :string, default: 'active'
  end
end

class AddMinPermissionToState < ActiveRecord::Migration[7.0]
  def change
    add_column :states, :min_permission, :integer, default: 0
  end
end

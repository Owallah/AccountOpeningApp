class RenameAmoundToAmount < ActiveRecord::Migration[7.0]
  def change
    rename_column :transactions, :amound, :amount
  end
end

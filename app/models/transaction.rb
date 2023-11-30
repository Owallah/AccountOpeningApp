class Transaction < ApplicationRecord
  belongs_to :user

  validates :amount, presence: true
  validates :transaction_type, presence: true
end

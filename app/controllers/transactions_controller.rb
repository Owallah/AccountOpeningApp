class TransactionsController < ApplicationController
  before_action :authorize_request

  
  def create
    @user = current_user # Assuming you have a method to get the current user
    amount = params[:amount].to_f
    if params[:transaction_type] == 'credit'
      @user.update(balance: @user.balance + amount)
    elsif params[:transaction_type] == 'debit'
      if @user.balance >= amount
        @user.update(balance: @user.balance - amount)
      else
        render json: { error: 'Insufficient funds' }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Invalid transaction type' }, status: :unprocessable_entity
    end
  end
end

class TransactionsController < ApplicationController
  before_action :authorize_request

  def create
    @user = @current_user
    amount = params[:amount].to_f
    transaction_type = params[:transactionType] 

    if transaction_type == 'credit'
      @user.update(balance: @user.balance + amount)
    elsif transaction_type == 'debit'
      if @user.balance >= amount
        @user.update(balance: @user.balance - amount)
      else
        render json: { error: 'Insufficient funds' }, status: :unprocessable_entity
        return 
      end
    else
      render json: { error: 'Invalid transaction type' }, status: :unprocessable_entity
      return 
    end

    
    render json: { message: 'Transaction processed successfully' }, status: :ok
  end

  def index
    @user = @current_user
    @transactions = @user.transactions.order(created_at: :desc)
    render json: @transactions, status: :ok
  end
end

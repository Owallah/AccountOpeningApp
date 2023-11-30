class UsersController < ApplicationController
  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def update
    user = User.find(params[:id])
    user.update!(user_params)
    render json: user, status: :ok
  end

  def index
    users = User.all
    render json: users
  end

  def show
    user = User.find(params[:id])
    render json: user,  status: :ok
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    head :no_content
  end



  def admin_approval
    user = User.find(params[:id])
    user.admin_approve!
  end

  def finance_approval
    user = User.find(params[:id])
    user.finance_approve!
  end

  private
  def user_params
    params.permit(:username, :email, :password, :password_confirmation, :status)
  end
end

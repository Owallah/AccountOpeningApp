class UsersController < ApplicationController
  before_action :authorize_request, except: :create
  before_action :find_user, except: %i[create index]

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: { errors: @user.errors.full_messages },
      status: :unprocessable_entity
    end
  end

  def update
    unless @user.update(user_params)
      render json: { errors: @user.errors.full_messages },
      status: :unprocessable_entity
    end
  end

  def index
    @users = User.all
    render json: @users, status: :ok
  end

  def show
    render json: @user, status: :ok
  end

  def destroy
    @user.destroy
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
    params.permit(:name, :email, :password, :password_confirmation, :status)
  end

  # def find_user
  #   @user = User.find_by_username!(params[:_username])
  #   rescue ActiveRecord::RecordNotFound
  #     render json: { errors: 'User not found' }, status: :not_found
  # end
end

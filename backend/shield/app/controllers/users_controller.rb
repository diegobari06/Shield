class UsersController < ApplicationController
  before_action only: [:show, :edit, :update, :destroy]
  # before_action :authenticate_admin!,only: [:create,:new,:update,:edit,:destroy,:index]
  # before_action :authenticate_employee!
  def index
    #render json: User.includes(:rol), status: 200
    @users = User.all
    render :json => @users, status: 200
  end

  def show
    @user = User.find(params[:id]);
    render json: @user, count:  @user.sign_in_count, status: 200
  end

  def count
    @user = User.find(params[:user_id]);
    render :json => {count: @user.sign_in_count}
  end

  def new
    @user = User.new
  end

   # POST /categories.json
  def create
    @user = User.new(user_params)
    @user.set_password
    if @user.save
      RegistrationMailer.sample_email(@user).deliver_now
      render json: @user, status: 200
    else
      render json: { errors: @user.errors }, status: 422
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update user_params
      render json: @user, status: 200
    else
      render json: { errors: @users.errors }, status: 422
    end
  end

  def user_params
       params.permit(:name, :session, :password, :password_confirmation, :email,:nickname,:permission_level,:rol_id,:id,:enabled,:company_id)
  end

  def destroy
    @user = User.find(params[:id]);
    @user.destroy
    head 204 # The server has processed the request and doesn't return any content
  end

end
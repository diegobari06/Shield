module Api
class ResidentsController < ApplicationController
  before_action :set_resident, only: [:show, :edit, :update, :destroy]

  # GET /residents.json
  def index
    @residents = Resident.where(company_id: params[:company_id])

    render json: @residents, status: 200
  end

  def show
  render :json => @resident
  end

  # GET /residents/new
  def new
    @resident = Resident.new
  end

  # GET /residents/1/edit
  def edit
  end

  def find
    @resident = Resident.where(identification_number: params[:id]).last;
      if @resident == nil
      render :json => 0
      else
      render json: @resident
      end
  end

  # POST /residents.json
  def create
    @resident = Resident.new(resident_params)
    if @resident.save
      render json: @resident, status: 200
    else
      render json: { errors: @resident.errors }, status: 422
    end
  end
 def findEnabled
   @residents = Resident.where("enabled = ? and company_id = ?",1,params[:company_id]);
   render json: @residents, status: 200
 end
 def findDisabled
   @residents = Resident.where("enabled = ? and company_id = ?",0,params[:company_id]);
   render json: @residents, status: 200
 end
  # PATCH/PUT /residents/1.json
  def update
    if @resident.update resident_params
      render :json => @resident
    else
      render json: { errors: @resident.errors }, status: 422
    end
  end

  # DELETE /residents/1.json
  def destroy
    @user = User.where(resident_id: params[:id]).last
    if @user != nil
      @user.destroy
    end
    @resident.destroy

    head 204 # The server has processed the request and doesn't return any content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_resident
      @resident = Resident.find(params[:id])
    end
 protected
    # Never trust parameters from the scary internet, only allow the white list through.
    def resident_params
      params.permit(:id,:name,:last_name,:second_last_name,:phone_number,:birthday,:email,:picture,:house_id,:company_id,:identification_number,:is_owner,:user_id, :enabled)
    end
end
end

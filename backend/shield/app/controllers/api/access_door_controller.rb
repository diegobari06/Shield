module Api
class AccessDoorController < ApplicationController
  before_action :set_access_door, only: [:show, :edit, :update, :destroy]

  # GET /residents.json
  def index
    @accessDoors = AccessDoor.where(company_id: params[:company_id])
    render json: @accessDoors, status: 200
  end

  def show
  render :json => @accessDoor.to_json(:include => [:residents])
  end

  # GET /residents/new
  def new
    @accessDoor = AccessDoor.new
  end

  # GET /residents/1/edit
  def edit
  end


  # POST /residents.json
  def create
    @quantity_allowed = CompanyConfiguration.where(company_id:  params[:company_id]).last.quantity_access_door
    @quantity_registered = AccessDoor.where(company_id:  params[:company_id]).count

    if(@quantity_registered == @quantity_allowed)
      render json: 'Limite de puertas de acceso registradas alcanzado.'
    else
    @accessDoor = AccessDoor.new(access_door_params)
    if @accessDoor.save
      render json: @accessDoor, status: 200
    else
      render json: { errors: @accessDoor.errors }, status: 422
    end
  end
  end

  # PATCH/PUT /residents/1.json
  def update
    if @accessDoor.update access_door_params
      render :json => @accessDoor
    else
      render json: { errors: @accessDoor.errors }, status: 422
    end
  end
  # DELETE /residents/1.json
  def destroy
    @accessDoor.destroy
    head 204 # The server has processed the request and doesn't return any content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_access_door
      @accessDoor = AccessDoor.find(params[:id])
    end
 protected
    # Never trust parameters from the scary internet, only allow the white list through.
    def access_door_params
      params.permit(:id,:name,:company_id)
    end
end
end

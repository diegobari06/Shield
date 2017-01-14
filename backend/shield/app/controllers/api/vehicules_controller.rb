module Api
class VehiculesController < ApplicationController
  before_action :set_vehicule, only: [:show, :edit, :update, :destroy]

  # GET /residents.json
  def index
    @vehicules = Vehicule.where(company_id: params[:company_id])
    render json: @vehicules, status: 200
  end

  def show
  render :json => @vehicule
  end

  # GET /residents/new
  def new
    @vehicule = Vehicule.new
  end
  def findEnabled
    @vehicules = Vehicule.where("enabled = ? and company_id = ?",1,params[:company_id]);
    render json: @vehicules, status: 200
  end
  def findDisabled
    @vehicules = Vehicule.where("enabled = ? and company_id = ?",0,params[:company_id]);
    render json: @vehicules, status: 200
  end
  def find
    @vehicule = Vehicule.where(license_plate: params[:id]).last;

      if @vehicule == nil
      render :json => 0
      else
    render :json => @vehicule
      end
  end

  # GET /residents/1/edit
  def edit
  end


  # POST /residents.json
  def create
    @vehicule = Vehicule.new(vehicule_params)
    if @vehicule.save
      render json: @vehicule, status: 200
    else
      render json: { errors: @vehicule.errors }, status: 422
    end
  end

  # PATCH/PUT /residents/1.json
  def update
    if @vehicule.update vehicule_params
      render :json => @vehicule
    else
      render json: { errors: @vehicule.errors }, status: 422
    end
  end

  # DELETE /residents/1.json
  def destroy
    @vehicule.destroy
    head 204 # The server has processed the request and doesn't return any content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_vehicule
      @vehicule = Vehicule.find(params[:id])
    end
 protected
    # Never trust parameters from the scary internet, only allow the white list through.
    def vehicule_params
      params.permit(:id,:license_plate,:house_id,:color,:brand,:company_id, :enabled)
    end
end
end

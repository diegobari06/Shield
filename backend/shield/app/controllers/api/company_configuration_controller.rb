module Api
class companyConfigurationsController < ApplicationController
  before_action :set_company_configuration, only: [:show, :edit, :update, :destroy]

  # GET /residents.json
  # def index
  #   @companyConfigurations = CompanyConfiguration.where(company_id: params[:company_id])
  #   render json: @companyConfigurations, status: 200
  # end


  def show
  render :json => @companyConfiguration
  end

  # GET /residents/new
  def new
    @companyConfiguration = CompanyConfiguration.new
  end

  # GET /residents/1/edit
  def edit
  end


  # POST /residents.json
  def create
    @companyConfiguration = CompanyConfiguration.new(company_configuration_params)
    if @companyConfiguration.save
      render json: @companyConfiguration, status: 200
    else
      render json: { errors: @companyConfiguration.errors }, status: 422
    end
  end

  # PATCH/PUT /residents/1.json
  def update
    if @companyConfiguration.update company_configuration_params
      render :json => @companyConfiguration
    else
      render json: { errors: @companyConfiguration.errors }, status: 422
    end
  end

  # DELETE /residents/1.json
  def destroy
    @companyConfiguration.destroy
    head 204 # The server has processed the request and doesn't return any content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_company_configuration
      @companyConfiguration = CompanyConfiguration.find(params[:id])
    end
 protected
    # Never trust parameters from the scary internet, only allow the white list through.
    def company_configuration_params
      params.permit(:id,:quantity_houses,:quantity_admins,:quantity_access_door,:company_id)
    end
end
end

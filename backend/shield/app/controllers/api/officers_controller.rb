module Api
class OfficersController < ApplicationController
  before_action :set_officer, only: [:show, :edit, :update, :destroy]

  # GET /residents.json
  def index
    @officers = Officer.where(company_id: params[:company_id])
    render json: @officers, status: 200
  end

  def show
  render :json => @officer
  end

  # GET /residents/new
  def new
    @officer = Officer.new
  end

  # GET /residents/1/edit
  def edit
  end


  # POST /residents.json
  def create
    @officer = Officer.new(officer_params)
    if @officer.save
      render json: @officer, status: 200
    else
      render json: { errors: @officer.errors }, status: 422
    end
  end

  # PATCH/PUT /residents/1.json
  def update
    if @officer.update officer_params
      render :json => @officer
    else
      render json: { errors: @officer.errors }, status: 422
    end
  end

  # DELETE /residents/1.json
  def destroy
    @officer.destroy
    head 204 # The server has processed the request and doesn't return any content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_officer
      @officer = Officer.find(params[:id])
    end
 protected
    # Never trust parameters from the scary internet, only allow the white list through.
    def officer_params
      params.permit(:id,:name,:last_name,:second_last_name,:identification_number,:company_id,:license,:in_service)
    end
end
end

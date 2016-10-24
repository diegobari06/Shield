class EmergenciesController < ApplicationController
  before_action :set_emergency, only: [:show, :edit, :update, :destroy]

  # GET /residents.json
  def index
    @emergencies = Emergency.where(company_id: params[:company_id]).last
    render json: @emergencies, status: 200
  end

  def show
  render :json => @emergency
  end

  # GET /residents/new
  def new
    @emergency = Emergency.new
  end

  # GET /residents/1/edit
  def edit
  end

  # POST /residents.json
  def create
    @emergency = Emergency.new(emergency_params)
    if @emergency.save
      render json: @emergency, status: 200
    else
      render json: { errors: @emergency.errors }, status: 422
    end
  end

  # PATCH/PUT /residents/1.json
  def update
    if @emergency.update emergency_params
      render :json => @emergency
    else
      render json: { errors: @emergency.errors }, status: 422
    end
  end

  # DELETE /residents/1.json
  def destroy
    @emergency.destroy
    head 204 # The server has processed the request and doesn't return any content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_emergency
      @emergency = Emergency.find(params[:id])
    end
 protected
    # Never trust parameters from the scary internet, only allow the white list through.
    def emergency_params
      params.permit(:id,:observation,:isAttended,:company_id,:house_id)
    end
end

class ResidentsController < ApplicationController
  before_action :set_resident, only: [:show, :edit, :update, :destroy]

  # GET /residents.json
  def index
    render json: Resident.all, status: 200
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


  # POST /residents.json
  def create
    @resident = Resident.new(resident_params)
    if @resident.save
      render json: @resident, status: 200
    else
      render json: { errors: @resident.errors }, status: 422
    end
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
      params.permit(:id,:name,:first_name,:last_name,:phone_number,:birthday,:picture,:id_house,:id_companny,:identification_number)
    end
end

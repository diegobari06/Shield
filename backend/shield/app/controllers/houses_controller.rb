class HousesController < ApplicationController
  before_action :set_house, only: [:show, :edit, :update, :destroy]

  # GET /residents.json
  def index
    @houses = House.where(company_id: params[:company_id])
    render json: @houses, status: 200
  end

  def show
  render :json => @house.to_json(:include => [:residents])
  end

  # GET /residents/new
  def new
    @house = House.new
  end

  # GET /residents/1/edit
  def edit
  end


  # POST /residents.json
  def create
    @house = House.new(house_params)
    if @house.save
      render json: @house, status: 200
    else
      render json: { errors: @house.errors }, status: 422
    end
  end

  # PATCH/PUT /residents/1.json
  def update
    if @house.update house_params
      render :json => @house
    else
      render json: { errors: @house.errors }, status: 422
    end
  end

  # DELETE /residents/1.json
  def destroy
    @house.destroy
    head 204 # The server has processed the request and doesn't return any content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_house
      @house = House.find(params[:id])
    end
 protected
    # Never trust parameters from the scary internet, only allow the white list through.
    def house_params
      params.permit(:id,:house_number,:extension,:company_id)
    end
end

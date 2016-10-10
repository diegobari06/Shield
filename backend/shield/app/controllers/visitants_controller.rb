class VisitantsController < ApplicationController
  before_action :set_visitant, only: [:show, :edit, :update, :destroy]

  # GET /visitants.json
  def index
    @visitants = Visitant.where(company_id: params[:company_id])
    render json: @visitants, status: 200
  end

  def show
  render :json => @visitant
  end

  # GET /visitants/new
  def new
    @visitant = Visitant.new
  end

  # GET /visitants/1/edit
  def edit
  end


  # POST /visitants.json
  def create
    @visitant = Visitant.new(visitant_params)
    time = Time.now
    @visitant.date_time = time.inspect
    if @visitant.save
      render json: @visitant, status: 200
    else
      render json: { errors: @visitant.errors }, status: 422
    end
  end

  # PATCH/PUT /visitants/1.json
  def update
    if @visitant.update visitant_params
      render :json => @visitant
    else
      render json: { errors: @visitant.errors }, status: 422
    end
  end

  # DELETE /visitants/1.json
  def destroy
    @visitant.destroy
    head 204 # The server has processed the request and doesn't return any content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_visitant
      @visitant = Visitant.find(params[:id])
    end
 protected
    # Never trust parameters from the scary internet, only allow the white list through.
    def visitant_params
      params.permit(:id,:name,:first_name,:last_name,:last_name2,:license_plate,:house_id,:company_id,:identification_number)
    end
end
module Api
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
    def find
      @visitant = Visitant.where(identification_number: params[:id]).last;
        if @visitant == nil
        render :json => 0
        else
        render json: @visitant
        end
    end

  # POST /visitants.json
  def create
    @visitant = Visitant.new(visitant_params)
    if(params[:invitation_starting_time] != nil)
    @visitant.invitation_starting_time = params[:invitation_starting_time].to_datetime;
    @visitant.invitation_limit_time = params[:invitation_limit_time].to_datetime;
   end
    @visitant.date_time = DateTime.now;
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

  def findRegisteredVisitant
    @currentDate = Time.now.strftime('%d %m %y %H:%M:%S')
    @visitant = Visitant.where("identification_number = ? and is_invited = ? and company_id = ?", params[:id], 1, params[:company_id]).last
    if (@visitant != nil)
    @starting_time = @visitant.invitation_starting_time.strftime('%d %m %y %H:%M:%S')
    @limit_time = @visitant.invitation_limit_time.strftime('%d %m %y %H:%M:%S')
    puts @starting_time
      if(@currentDate.between?(@starting_time,  @limit_time))
        render :json => @visitant
       else
         render :json => 0
       end
   else
     render :json => 0
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
      params.permit(:id,:name,:last_name,:second_last_name,:license_plate,:id_house,:company_id,:identification_number,:invitation_starting_time,:invitation_limit_time,:is_invited)
    end
end
end

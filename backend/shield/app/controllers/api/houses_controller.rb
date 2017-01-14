module Api
class HousesController < ApplicationController
  before_action :set_house, only: [:show, :edit, :update, :destroy]

  # GET /residents.json
  def index
    @houses = House.where(company_id: params[:company_id])
    render json: @houses, status: 200
  end

  def show
  if(@house.desocupation_initial_time != nil && @house.desocupation_final_time != nil)
    @house.desocupation_final_time = (  @house.desocupation_final_time + 1.days);
    @house.desocupation_initial_time = (  @house.desocupation_initial_time + 1.days);
  end
  render :json => @house.to_json(:include => [:residents])
  end

  # GET /residents/new
  def new
    @house = House.new
  end
  def findNotes
    @notes = Note.where("company_id = ? and house_id =?",params[:company_id],params[:id])
    render json: @notes, status: 200
  end

  def findvisitors
    @visitors = Visitant.where("company_id = ? and house_id =? and date_time = ? and is_invited = ?",params[:company_id],params[:id],params[:date_time], 0)
    render json: @visitors, status: 200
  end
  # GET /residents/1/edit
  def edit
  end

  def findInvitedVisitants
    @visitors = Visitant.where("company_id = ? and id_house =? and is_invited = ? or is_invited = ?",params[:company_id],params[:house_id],1,3)
       @visitors.each do |visitant|
         visitant.invitation_limit_time = (visitant.invitation_limit_time + 6.hours);
         visitant.invitation_starting_time = (visitant.invitation_starting_time + 6.hours);
       end
    render json: @visitors, status: 200
  end
  # POST /residents.json
  def create
    @quantity_allowed = CompanyConfiguration.where(company_id:  params[:company_id]).last.quantity_houses
    @quantity_registered = House.where(company_id:  params[:company_id]).count

    if(@quantity_registered-1 == @quantity_allowed)
      render json: {'error': 'Limite de viviendas registradas alcanzado.'}
    else
    @house = House.new(house_params)
    if @house.save
      render json: @house, status: 200
    else
      render json: { errors: @house.errors }, status: 422
    end
  end
  end
  def findResidents
    @residents = Resident.where("company_id = ? and house_id = ?", params[:company_id],params[:house_id])
    render json: @residents, status: 200
  end
def findVehicules
  @vehicules = Vehicule.where("company_id = ? and house_id = ?", params[:company_id],params[:house_id])
  render json: @vehicules, status: 200
end
def findResidentsEnabled
  @residents = Resident.where("company_id = ? and house_id = ? and enabled = ?", params[:company_id],params[:house_id],1)
  render json: @residents, status: 200
end
def findResidentsDisabled
  @residents = Resident.where("company_id = ? and house_id = ? and enabled = ?", params[:company_id],params[:house_id],0)
  render json: @residents, status: 200
end
def findVehiculesEnabled
  @vehicules = Vehicule.where("company_id = ? and house_id = ? and enabled = ?", params[:company_id],params[:house_id],1)
  render json: @vehicules, status: 200
end
def findVehiculesDisabled
  @vehicules = Vehicule.where("company_id = ? and house_id = ? and enabled = ?", params[:company_id],params[:house_id],0)
  render json: @vehicules, status: 200
end
def findVisitants
  puts params[:house_id]
  if(params[:house_id] == "-999999")
      @visitants = Visitant.where("company_id = ? and is_invited = ?", params[:company_id], 0);
  else
      @visitants = Visitant.where("company_id = ? and id_house = ? and is_invited = ?", params[:company_id],params[:house_id], 0);
  end
  @currentMonth = Time.now.strftime('%m');
  @filteredVisitants = [];
  if(params[:consulting_final_time] == nil && params[:consulting_initial_time] == nil)
   @visitants.each do |visitant|
     if(visitant.date_time.strftime('%m') == @currentMonth)
      @filteredVisitants.push(visitant)
   end
 end
 else
   @limitTime = params[:consulting_final_time].to_date.strftime('%Y-%m-%d').to_date;
   @initialTime = params[:consulting_initial_time].to_date.strftime('%Y-%m-%d').to_date;

   @visitants.each do |visitant|
      @dateTime = (visitant.date_time.to_date);
     if(@dateTime >= @initialTime && @dateTime <= @limitTime)
      @filteredVisitants.push(visitant);
   end
 end
 end
  render json: @filteredVisitants, status: 200
end

def findVisitant
  puts params[:id_house]
  @visitant = Visitant.where("company_id = ? and identification_number = ? and id_house = ?", params[:company_id],params[:id], params[:house_id]).last
  puts @visitant
  if @visitant != nil
    render json: @visitant, status: 200
  else
      render json: 0
  end
end
def findInvitedVisitant
  puts params[:id_house]
  @visitant = Visitant.where("company_id = ? and identification_number = ? and id_house = ? and is_invited = ? or is_invited = ?", params[:company_id],params[:id], params[:house_id],1,3).last
  puts @visitant
  if @visitant != nil
    render json: @visitant, status: 200
  else
      render json: 0
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
  def checkDesocupatedHouse
   @house = House.where("company_id = ? and id = ?", params[:company_id], params[:id_house])
   if (@house.is_desocupated == 1)
     render :json =>  1
   end
     render :json =>  0
  end
  def setDesocupatedHouse
   @house = House.where("company_id = ? and id = ?", params[:company_id], params[:house_id]).last
   @house.is_desocupated = 0
   @house.desocupation_final_time = nil
   @house.desocupation_initial_time = nil
   if @house.save
     render json: @house, status: 200
   else
     render json: { errors: @house.errors }, status: 422
   end
  end
   def checkDesocupated
    @desocupatedHouses = House.where("is_desocupated = ? and company_id = ?",1,params[:company_id])
     @desocupatedHouses.each do |house|
        @limitTime = house.desocupation_final_time.strftime('%d %m %y')
        @currentDate = Time.now.strftime('%d %m %y')
        if @limitTime <= @currentDate
          house.is_desocupated = 0
          house.desocupation_final_time = nil
          house.desocupation_initial_time = nil
          house.save
        end
     end
     render :json =>  @desocupatedHouses
   end
  def setDesocupated

   @house = House.find(params[:id])
   @house.is_desocupated = 1
   if @house.update house_params
     DesocupationMailer.desocupation_email(@house).deliver_now
     @house.desocupation_final_time = (  @house.desocupation_final_time + 1.days);
     @house.desocupation_initial_time = (  @house.desocupation_initial_time + 1.days);
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
      params.permit(:id,:consulting_initial_time,:consulting_final_time,:house_number,:extension,:identification_number,:securityKey,:emergencyKey,:id_house,:company_id,:is_desocupated,:desocupation_initial_time,:desocupation_final_time)
    end
end
end

class WatchesController < ApplicationController
  before_action :set_watch, only: [:show, :edit, :update, :destroy]
  # before_action :authenticate_user!
  #  before_action :authenticate_employee!
  # GET /categories
  # GET /categories.json
  def index
    @watches = Watch.where(company_id: params[:company_id])
    render json: @watches, status: 200
  end

  def show
  render :json => @watch.to_json(:include => [:officers])
  end

  def filterWatches
      @watches = Watch.where("company_id = ?", params[:company_id])
      @filteredWatches = [];
       @limitTime = params[:consulting_final_time].to_date;
       @initialTime = params[:consulting_initial_time].to_date;
       @currentTime = DateTime.now.to_date;

       puts @currentTime

       puts @initialTime
              puts @limitTime
       @watches.each do |watch|
           puts watch.initial_time.to_date;
         if(watch.final_time == nil)
           if(watch.initial_time.to_date >= @initialTime && @currentTime <= @limitTime)
            @filteredWatches.push(watch)
           end
         else
         if(watch.initial_time.to_date >= @initialTime && watch.final_time.to_date <= @limitTime)
          @filteredWatches.push(watch)
       end
     end
     end
      render json: @filteredWatches, status: 200
  end

  def currentWatch
     render :json => Watch.where("company_id = ?",params[:company_id]).last.to_json(:include => [:officers])
  end
  # GET /categories/new
  def new
    @watch = Watch.new
  end

  # GET /categories/1/edit
  def edit
  end
  # POST /categories.json
  def create
    @currentTime =(DateTime.now - 1.days);
    @lastWatch = Watch.where("company_id = ? and access_door_id =?",params[:company_id], params[:access_door_id]).last
    if @lastWatch != nil
    @lastWatch.final_time = @currentTime
    @lastWatch.setMyGuardsInactive
    @lastWatch.save
    end
    @watch = Watch.new(watch_params)
    @watch.setOfficers = params[:officers]
    @watch.initial_time = @currentTime
    if @watch.save
      render :json => @watch.to_json(:include => [:officers,:access_door])
    else
      render json: { errors: @watch.errors }, status: 422
    end

  end
  def destroy
    @watch.destroy
    head 204 # The server has processed the request and doesn't return any content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_watch
      @watch = Watch.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def watch_params
      params.permit(:initial_time,:id,:final_time,:company_id,:officers,:access_door_id)
    end


end

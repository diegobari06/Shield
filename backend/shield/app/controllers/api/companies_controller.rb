module Api
class CompaniesController < ApplicationController
  before_action :set_company, only: [:show, :edit, :update, :destroy]

  # GET /residents.json
  def index
    render json: Company.all, status: 200
  end

  def show
  render :json => @company
  end

  # GET /residents/new
  def new
    @company = Company.new
  end

  # GET /residents/1/edit
  def edit
  end


  # POST /residents.json
  def create
    @company = Company.new(company_params)
    if @company.save
      render json: @company, status: 200
    else
      render json: { errors: @company.errors }, status: 422
    end
  end

  # PATCH/PUT /residents/1.json
  def update
    if @company.update company_params
      render :json => @company
    else
      render json: { errors: @company.errors }, status: 422
    end
  end

  # DELETE /residents/1.json
  def destroy
    @company.destroy
    head 204 # The server has processed the request and doesn't return any content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_company
      @company = Company.find(params[:id])
    end
 protected
    # Never trust parameters from the scary internet, only allow the white list through.
    def company_params
      params.permit(:id,:name)
    end
end
end

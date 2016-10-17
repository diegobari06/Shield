class NotesController < ApplicationController
  before_action :set_note, only: [:show, :edit, :update, :destroy]

  # GET /residents.json
  def index
    @notes = Note.where(company_id: params[:company_id])

    render json: @notes, status: 200
  end


  def show
  render :json => @note
  end

  # GET /residents/new
  def new
    @note = Note.new
  end

  # GET /residents/1/edit
  def edit
  end


  # POST /residents.json
  def create
    @note = Note.new(note_params)
    if @note.save
      render json: @note, status: 200
    else
      render json: { errors: @note.errors }, status: 422
    end
  end

  # PATCH/PUT /residents/1.json
  def update
    if @note.update note_params
      render :json => @note
    else
      render json: { errors: @note.errors }, status: 422
    end
  end

  # DELETE /residents/1.json
  def destroy
    @note.destroy
    head 204 # The server has processed the request and doesn't return any content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_note
      @note = Note.find(params[:id])
    end
 protected
    # Never trust parameters from the scary internet, only allow the white list through.
    def note_params
      params.permit(:id,:description,:company_id,:house_id,:note_type)
    end
end

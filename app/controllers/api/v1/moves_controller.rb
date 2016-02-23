class Api::V1::MovesController < ApiController
  before_action :move, only: [:update, :destroy]

  def index
    # OPTIMIZE this to a different method
    if search_query = params[:move_query]
      @moves = Move.where('lower(name) ILIKE ?', "%#{search_query}%")
      @moves = Move.all if @moves.count == 0
    else
      @moves = Move.all.order(:name)
    end
    @moves.order(:name)
  end

  def update
    # TODO make sure the error works
    if @move.update(move_params)
      render :move
    else
      render json: {errors: @move.errors.full_messages}, status: 500
    end
  end

  def create
    @move = Move.new(move_params)
    if @move.save
      render :move
    else
      render json: {errors: @move.errors.full_messages}, status: 500
    end
  end

  def destroy
    @move.destroy
    @moves = Move.all.order(:name)
    render :index
  end

  private
    def move_params
      params.require(:move).permit(:name, :url)
    end

    def move
      @move = Move.find(params[:id])
    end
end

class Api::V1::DaysController < ApiController
  def index
    @days = Day.all.order(:id)
  end

  def show
    @day = Day.find(params[:id])
  end
end

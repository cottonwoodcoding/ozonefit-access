class Api::V1::MotivationsController < ApplicationController
  before_action :motivation, only: [:update, :destroy]

  def index
    @motivations = Motivation.all
  end

  def create
    @motivation = Motivation.new(motivation_params)
    if @motivation.save
      render :motivation
    else
      render json: {errors: @motivation.errors.full_messages}, status: 500
    end
  end

  def update
    if @motivation.update(motivation_params)
      render :motivation
    else
      render json: {errors: @motivation.errors.full_messages}, status: 500
    end
  end

  def destroy
    @motivation.destroy
    head :ok
  end

  private

    def motivation_params
      params.require(:motivation).permit(:text)
    end

    def motivation
      @motivation = Motivation.find(params[:id])
    end
end

class Api::V1::NutritionsController < ApplicationController
  before_action :nutrition, except: [:index, :create]

  def index
    @nutritions = Nutrition.all.order(:created_at)
  end

  def create
    @nutrition = Nutrition.new(nutrition_params)
    if @nutrition.save
      render :nutrition
    else
      render json: {errors: @nutrition.errors.full_messages.join(',')}
    end
  end

  def update
    if @nutrition.update(nutrition_params)
      render :nutrition
    else
      render json: {errors: @nutrition.errors.full_messages.join(',')}
    end
  end

  def destroy
    @nutrition.destroy
    head :ok
  end

  private
    def nutrition_params
      params.require(:nutrition).permit(:embedUrl)
    end

    def nutrition
      @nutrition = Nutrition.find(params[:id])
    end
end

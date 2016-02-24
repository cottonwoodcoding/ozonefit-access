class NutritionController < ApplicationController
  def index
    @nutrition = Nutrition.all.sample
  end
end

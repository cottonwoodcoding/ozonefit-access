class Nutrition < ActiveRecord::Base
  validates_presence_of :embedUrl
  validates_uniqueness_of :embedUrl
end

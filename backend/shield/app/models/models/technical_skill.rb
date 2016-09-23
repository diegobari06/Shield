class TechnicalSkill < ActiveRecord::Base
  validates :name,presence: true , uniqueness:true
  has_and_belongs_to_many :subcategories
  has_and_belongs_to_many :profile
end

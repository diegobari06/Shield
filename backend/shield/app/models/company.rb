class Company < ActiveRecord::Base
  validates :name,:uniqueness => true
  has_many :residents
  has_many :houses
end

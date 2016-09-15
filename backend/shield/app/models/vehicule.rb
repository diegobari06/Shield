class Vehicule < ActiveRecord::Base
  validates :license_plate,:uniqueness => true
  belongs_to :company
end

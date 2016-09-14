class Resident < ActiveRecord::Base
  validates :identification_number,:uniqueness => true
  belongs_to :house
  belongs_to :company
end

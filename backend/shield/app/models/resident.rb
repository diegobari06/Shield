class Resident < ActiveRecord::Base
   self.primary_key = "id"
  validates :identification_number,:uniqueness => true
end

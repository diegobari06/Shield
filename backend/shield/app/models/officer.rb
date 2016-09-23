class Officer < ActiveRecord::Base
  validates :identification_number,:uniqueness => true
  belongs_to :company
end

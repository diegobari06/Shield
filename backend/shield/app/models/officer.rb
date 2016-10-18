class Officer < ActiveRecord::Base
  validates :identification_number,:uniqueness => true
  belongs_to :company
  has_and_belongs_to_many :watches
end

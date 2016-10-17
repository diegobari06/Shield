class House < ActiveRecord::Base
  validates :house_number,:uniqueness => true
  has_many :residents
  has_many :notes
  belongs_to :company
end

class House < ActiveRecord::Base
  validates :house_number,:uniqueness => true
  has_many :residents
  belongs_to :company
end

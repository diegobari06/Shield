class House < ActiveRecord::Base
  has_many :residents
  has_many :notes
  belongs_to :company
end

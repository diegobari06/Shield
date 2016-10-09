class Visitant < ActiveRecord::Base
  belongs_to :company
  belongs_to :houses
end

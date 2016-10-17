class Note < ActiveRecord::Base
  belongs_to :company
  belongs_to :house
end

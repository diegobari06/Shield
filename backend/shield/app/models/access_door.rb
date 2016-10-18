class AccessDoor < ActiveRecord::Base
  belongs_to :company
  has_many :watch
end

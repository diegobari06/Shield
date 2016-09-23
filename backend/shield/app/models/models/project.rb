class Project < ActiveRecord::Base
  self.primary_key = "id"
  belongs_to :profile
end

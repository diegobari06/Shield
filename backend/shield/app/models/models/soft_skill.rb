class SoftSkill < ActiveRecord::Base
    self.primary_key = "id"
  validates :description,presence: true 
  belongs_to :profile
end

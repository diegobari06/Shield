class Certification < ActiveRecord::Base
    self.primary_key = "id"
  validates :title,presence: true
  belongs_to :profile
end

class Education < ActiveRecord::Base
  self.table_name = "education"
  self.primary_key = "id"
  validates :university_degree,presence: true
  belongs_to :profile
end

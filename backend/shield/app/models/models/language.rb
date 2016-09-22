class Language < ActiveRecord::Base
  self.primary_key = "id"
  validates :language,presence: true
  belongs_to :profile
end

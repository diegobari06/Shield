class Subcategory < ActiveRecord::Base
  validates :name,presence: true , uniqueness:true
  has_and_belongs_to_many :categories
  has_and_belongs_to_many :technical_skills
  after_create :save_technical_skills
  before_update :save_technical_skills
  attr_accessor :weights

# getter
def weights
 @weights
end

# setter
def weights=(val)
@weights = val
end
 def setTechnicalSkills=(value)
   @technical_skills = value
 end

   def remove_old_technical_skills
      SubcategoriesTechnicalSkills.where(subcategory_id: self.id).destroy_all
   end

   def save_technical_skills
     if  @technical_skills != nil
         @technical_skills.each do |technical_skill|
           SubcategoriesTechnicalSkills.create(technical_skill_id: technical_skill.values[0],subcategory_id: self.id,weight: technical_skill.values[2],)
         end
   end
 end
end

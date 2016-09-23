class SubcategoriesTechnicalSkills < ActiveRecord::Base
belongs_to :subcategory
belongs_to :technical_skill

  scope :find_related_weight,->(subcategoryId,technicalSkillId){where("subcategory_id = ? AND technical_skill_id = ?", "#{subcategoryId}", "#{technicalSkillId}")}
end

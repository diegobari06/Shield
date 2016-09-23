class Profile < ActiveRecord::Base
  self.table_name = "profile"
  self.primary_key = "id"
  belongs_to :user
  has_many :education
  has_many :certifications
  has_and_belongs_to_many :technical_skills
  has_and_belongs_to_many :projects, :through => :projects_has_technical_skills


    def set_technical_skills=(value)
      @technicalSkills = value
    end

    def remove_old_technical_skills
       ProfileTechnicalSkills.where(profile_id: self.id).destroy_all
    end

    def save_technical_skills
      if  @technicalSkills != nil
        @technicalSkills.each do |technicalSkill|
              ProfileTechnicalSkills.create(technical_skill_id: technicalSkill.values[0],profile_id: self.id)
          end
      end
    end
end

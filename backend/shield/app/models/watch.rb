class Watch < ActiveRecord::Base
   belongs_to :company
   belongs_to :access_door
   has_and_belongs_to_many :officers
   after_create :save_officers
   before_update :save_officers

  def setOfficers=(value)
    @officers = value
  end

 def setMyGuardsInactive
  @officerWatches = OfficersWatches.where(watch_id: self.id)
  @officerWatches.each do |oW|
    Officer.find(oW.officer_id).update_attribute(:in_service, 0)
  end
 end
  def save_officers
    if  @officers != nil
      @officers.each do |officer|
           @officer = Officer.find(officer.values[0])
           @officer.update_attribute(:in_service, 1)
            OfficersWatches.create(officer_id: officer.values[0],watch_id: self.id)
        end
   end
  end
end

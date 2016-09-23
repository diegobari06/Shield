class Category < ActiveRecord::Base
   validates :name,presence: true , uniqueness:true
   has_and_belongs_to_many :subcategories
   after_create :save_subcategories
   before_update :save_subcategories

  def setSubcategories=(value)
    @subcategories = value
  end

  def remove_old_subcategories
     CategoriesSubcategories.where(category_id: self.id).destroy_all
  end

  def save_subcategories
    if  @subcategories != nil
      @subcategories.each do |subcategory|
          CategoriesSubcategories.create(subcategory_id: subcategory.values[0],category_id: self.id)
        end
  end
end
end

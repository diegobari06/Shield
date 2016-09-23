class CategoriesSubcategories < ActiveRecord::Base
belongs_to :Category
belongs_to :subcategory
end

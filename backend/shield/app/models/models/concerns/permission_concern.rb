module PermissionConcern
  extend ActiveSupport::Concern
  def is_employee?
    self.permission_level<=1
  end

  def is_admin?
    self.permission_level==2
  end

  def is_super_admin?
    self.permission_level<=3
  end
end

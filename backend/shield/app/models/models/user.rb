class User < ActiveRecord::Base
  # Include default devise modules.
  belongs_to :rol
  has_one :profile, foreign_key: 'users_id'


  include DeviseTokenAuth::Concerns::User
  before_save -> { skip_confirmation! }
  before_save :set_password
  #after_initialize :sign_count

  def set_password
    if new_record?
      self.password = SecureRandom.hex(4);
      self.password_confirmation = self.password
    end
  end
=begin

  def sign_count
    count = self.sign_in_count
    puts count
    self.sign_in_count = count
  end
=end
end

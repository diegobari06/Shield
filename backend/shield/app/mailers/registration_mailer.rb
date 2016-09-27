class RegistrationMailer < ApplicationMailer
  default from: "notifications@lighthousedevcr.com"

  def sample_email(user)
    @user = user
    mail(to: @user.email, subject: 'Bienvenido a Shield')
  end
end

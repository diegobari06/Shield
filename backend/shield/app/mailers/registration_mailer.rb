class RegistrationMailer < ApplicationMailer
  default from: "notifications@lighthousedevcr.com"

  def sample_email(user)
    @user = user
    mail(to: 'sergiojcr16@gmail.com', subject: 'Bienvenido a Shield')
  end
end

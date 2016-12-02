class DesocupationMailer < ApplicationMailer
  default from: "notifications@lighthousedevcr.com"

  def desocupation_email(house)
    @house = house
    puts @house
    @initialTime = @house.desocupation_initial_time.strftime('%d/%m/%Y')
    @limitTime = @house.desocupation_final_time.strftime('%d/%m/%Y')
    @condominium = Company.find(@house.company_id).name
    @admins = User.where(permission_level: 2)
    mail(bcc: @admins.map(&:email).uniq, subject: 'La casa '+@house.house_number+' estará desocupada.')
  end
end

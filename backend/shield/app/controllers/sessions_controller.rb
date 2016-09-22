class SessionController < Devise::DeviseController

    def after_sign_in_path_for()
        if resource.sign_in_count == 1
           render :json => {:success=>true, :auth_token=>resource.authentication_token, :login=>resource.login, :email=>resource.email, :count=>1}
        end
    end

end

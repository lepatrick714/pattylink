class SessionsController < ApplicationController
  def omniauth
    user = User.from_google_omniauth(request.env['omniauth.auth'])
    if user.valid?
      session[:user_id] = user.id
      redirect_to root_path
    else
      redirect_to '/login'
    end
  end
end

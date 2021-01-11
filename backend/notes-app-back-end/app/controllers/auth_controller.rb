class AuthController < ApplicationController


    def create 

        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
            payload = {user_id: user.id}
            token = JWT.encode(payload, 'ChAr1I3', 'HS256')
            render json: {id: user.id, username: user.username, token: token}
        else
          render json: { error: 'Invalid username or password.'}
        end
    end 

    def show 
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'ChAr1I3', true, { algorithm: 'HS256' })
        user_id = decoded_token[0]['user_id']
        user = User.find(user_id)
        if user 
            render json: {id: user.id, username: user.username, token: token}
        else 
            render json: { error: 'Invalid token'}
        end
    end

    def omniauth  
        user = User.create_from_omniauth(auth)
        payload = {user_id: user.id}
        token = JWT.encode(payload, 'ChAr1I3', 'HS256')
        if user.valid?
            # render json: {id: user.id, username: user.username}
            redirect_to "http://localhost:3000/notes?id=#{token}"
        else
            render json: { error: 'Invalid user'}
        end
    end

     private
    def auth
        request.env['omniauth.auth']
    end

     
end

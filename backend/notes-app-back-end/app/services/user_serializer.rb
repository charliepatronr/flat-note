class UserSerializer

    def initialize(user_obj, token)
        @user = user_obj
    end

    def to_serialized_json
        options = {
            include: {
                notes: {
                    only: [:id, :title, :content]
                }
            },
            except: [:updated_at, :password_digest, :created_at],
        }
        @user.to_json(options)
    end
end
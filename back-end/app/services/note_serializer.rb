class NoteSerializer

    def initialize(note_obj)
        @note = note_obj
    end

    def to_serialized_json
        options = {
            include: {
                user: {
                    only: [:id, :name, :email, :username]
                }
            },
            except: [:updated_at],
        }
        @note.to_json(options)
    end
end
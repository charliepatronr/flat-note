class NotesController < ApplicationController


    def index 
        user = false
        if user
            notes = user.notes
            render json: NoteSerializer.new(notes).to_serialized_json
        else
            notes = Note.all
            render json: NoteSerializer.new(notes).to_serialized_json
        end
    end

    def show 
        note = Note.find(params[:id])
        render json: NoteSerializer.new(note).to_serialized_json
    end


    def create 
        user = User.find(params[:userId])
        title = params[:note][:title]
        content = params[:note][:content]
        # byebug
        # note = Note.create(title: title, content: content)
        # byebug
        # if note.save 
        #     user.notes << note
        #     render json: NoteSerializer.new(note).to_serialized_json
        # else 
        #     render json: {message: 'Note could not be added'}
        # end 
        # note.save returns false (next two lines)
            #<Note id: nil, user_id: nil, title: "LISBDKJASDNC", content: "ALKSJDNVKLAJSDNKjnkajsdnflkasjdnflkasdjnflasdnfc.m...", created_at: nil, updated_at: nil>
            #(byebug) note.save
            #false

        note = Note.new(title: title, content: content)
        if Note.new(title: title,  content: content)
            user.notes << note
            render json: NoteSerializer.new(note).to_serialized_json
        else 
            render json: {message: 'Note could not be added'}
        end 
    end 


    def update
        note_id = params[:id]
        title = params['note']['title']
        content = params['note']['content']
        note = Note.find(note_id)
        if note.update(title: title, content: content)
            render json: NoteSerializer.new(note).to_serialized_json
        else 
            render json: { message: 'Note could not be updated' }
        end 

    end

    def destroy
        note = Note.find(params[:id])
        note.destroy
        render json: { message: "Note was destroyed"}
    end


end

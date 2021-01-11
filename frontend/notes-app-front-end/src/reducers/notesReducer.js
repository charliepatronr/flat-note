

const notesReducer = (state=[], action) => {
    switch(action.type) {
      case 'FETCH_NOTES':
        return [...action.notes]
    case 'CREATE_NOTE': 
        return [...state, action.newNote]

    case 'EDIT_NOTE':
        const index = state.findIndex(note => note.id === action.editedNote.id)
        console.log(index)
        const newState = state.map((note, idx) => {
            if (idx === index){
                return action.editedNote
            } else {
                return note
            }
        })
        console.log(newState)

        return [...newState]
    case 'DELETE_NOTE':
        console.log('DELETING LKAJSDFBLKJASHDKLJASHDILUASH')
        console.log(action.toDelete)
        const deletedState = state.filter(note => note.id !== action.toDelete)
        return [...deletedState]

      default:
        return state
    }
  }


export default notesReducer
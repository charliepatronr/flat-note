

export const createNote = (data) => {
    return {
        type: 'CREATE_NOTE', 
        newNote: data
    }
} 
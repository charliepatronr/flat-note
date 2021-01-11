

export const deleteNote = (data) => {
    return {
        type: 'DELETE_NOTE', 
        toDelete: data
    }
} 
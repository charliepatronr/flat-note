

export const fetchNotes = (notes) => {
    return {
        type: 'FETCH_NOTES', 
        notes : notes
    }
}
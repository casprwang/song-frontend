import api from './services.js'

// action
export const fetchNotes = () => async (dispatch) => {
  let notes
  try {
    notes = await api.getNotes()
    dispatch({ type: 'LOAD_NOTES', payload: notes })
  } catch (e) {
    console.error(e)
  }
}

export const addNote = content => async (dispatch) => {
  try {
    let res = await api.postNote(content)
    dispatch({ type: 'ADD_NOTE', payload: res })
    dispatch(fetchNotes())
  } catch (e) {
    console.error(e)
  }
}

export const deleteNote = id => async (dispatch) => {
  try {
    await api.deleteNoteById(id)
    dispatch({ type: 'DELETE_NOTE' })
    dispatch(fetchNotes())
  } catch (e) {
    console.error(e)
  }
}

export const changeDraft = content => ({
  type: 'DRAFT_CHANGE',
  payload: content,
})
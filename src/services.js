import utils from './utils'

const URL = 'http://localhost:3000/'

const getNotes = async () =>
  fetch(URL + 'note')
    .then(res => res.json())
    .then(notes => notes.map(note => {
      note.id = utils.toHexString(note.id)
      return note
    }))
    .catch(e => console.error(e))

const postNote = async (text) => {
  if (!text) return
  let options = {
    method: 'POST',
    body: text,
    headers: {
      'Content-Type': 'text/plain'
    }
  }
  return fetch(URL + 'note', options)
    .then(res => res.text())
    .catch(e => console.error(e))
}

const deleteNoteById = async (id) => {
  if (!id) return
  let options = {
    method: 'DELETE',
  }
  return fetch(URL + 'note?id=' + id, options)
    .catch(e => console.error(e))
}

const editNote = async (id, content) => {
  if (!id) return
  let options = {
    method: 'PUT',
    body: content,
    headers: {
      'Content-Type': 'text/plain'
    }
  }
  return fetch(URL + 'note?id=' + id, options)
    .catch(e => console.error(e))
}


export default {
  getNotes,
  postNote,
  deleteNoteById,
  editNote,
}

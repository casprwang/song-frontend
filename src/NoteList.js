import React from 'react'
import { connect } from 'react-redux'
import { deleteNote } from './actions.js'

const mapStateToProps = state => ({
  notes: state.notes
})

const ConnectedList = props => {
  const clickHandler = (e, id) => {
    if (e) e.preventDefault()
    if (e.metaKey) {
      props.onDeleteNote(id)
    }
  }

  return (
    <ul>
      {props.notes.map((note, i) => (
        <li onClick={(e) => clickHandler(e, note.id)} key={i}>{note.content}</li>
      ))}
    </ul>
  )
}


const mapDispatchToProps = dispatch => ({
  onDeleteNote: (id) => dispatch(deleteNote(id))
})

const NoteList = connect(mapStateToProps, mapDispatchToProps)(ConnectedList)

export default NoteList

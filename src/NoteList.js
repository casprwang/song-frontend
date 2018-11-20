import React from 'react'
import { connect } from 'react-redux'
import { deleteNote, editNote, changeEdit, startEdit } from './actions.js'

const ConnectedList = props => {
  const clickHandler = (e, id, content) => {
    if (e) e.preventDefault()
    if (e.metaKey) {
      props.onDeleteNote(id)
    } else {
      props.onEditStart(content)
    }
  }

  return (
    <ul>
      {props.notes.map(
        (note, i) =>
          (!props.isEditing && (
            <li onClick={e => clickHandler(e, note.id, note.content)} key={i}>
              {note.content}
            </li>
          )) || (
            <input
              type="text"
              value={props.editContent}
              key={i}
              onFocus={e => {
                console.log('on focus')
                e.target.value = props.editContent
              }}
              onChange={e => {
                props.onEditChange(e.target.value)
              }}
              onKeyDown={e => {
                console.log(e.key)
                if (e.key === 'Escape') {
                  props.onEditNote(note.id, note.content)
                }
              }}
            />
          )
      )}
    </ul>
  )
}

const mapStateToProps = state => ({
  notes: state.notes,
  isEditing: state.isEditing,
  editContent: state.editContent
})

const mapDispatchToProps = dispatch => ({
  onDeleteNote: id => dispatch(deleteNote(id)),
  onEditNote: (id, content) => dispatch(editNote(id, content)),
  onEditChange: content => dispatch(changeEdit(content)),
  onEditStart: content => dispatch(startEdit(content))
})

const NoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedList)

export default NoteList

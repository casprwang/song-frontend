import React from 'react'
import { connect } from 'react-redux'

import { deleteNote, endEdit, changeEdit, startEdit } from './actions.js'

const ConnectEditable = props => {
  const clickHandler = e => {
    if (e) e.preventDefault()
    if (e.metaKey) {
      props.onDeleteNote(props.note.id)
    } else {
      props.onEditStart(props.note)
    }
  }

  return props.curEditId === props.note.id ? (
    <input
      type="text"
      value={props.editContent}
      onClick={e => clickHandler(e)}
      onChange={e => {
        props.onEditChange(e.target.value)
      }}
      onKeyDown={e => {
        if (e.key === 'Escape') {
          props.onEditEnd(props.curEditId, props.editContent)
        }
      }}
    />
  ) : (
    <span onClick={e => clickHandler(e)}>{props.note.content}</span>
  )
}

const mapStateToProps = state => ({
  isEditing: state.isEditing,
  editContent: state.editContent,
  curEditId: state.curEditId
})

const mapDispatchToProps = dispatch => ({
  onDeleteNote: id => dispatch(deleteNote(id)),
  onEditEnd: (id, content) => dispatch(endEdit(id, content)),
  onEditChange: content => dispatch(changeEdit(content)),
  onEditStart: note => dispatch(startEdit(note))
})

const Editable = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectEditable)

export default Editable

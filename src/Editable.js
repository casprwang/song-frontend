import React, { useState } from 'react'
import { connect } from 'react-redux'

import { deleteNote, endEdit, changeEdit, startEdit } from './actions.js'

const ConnectEditable = props => {
  const [minRow, setMinRow] = useState(2)
  const resize = (e, id) => {
    let ele = document.getElementById(id)
    let minRows = 2
    let rows
    rows = Math.ceil((ele.scrollHeight - 40) / 18)
    setMinRow(rows + minRows)
  }

  const clickHandler = (e, id) => {
    if (e) e.preventDefault()
    resize(e, id)
    if (e.metaKey) {
      props.onDeleteNote(props.note.id)
    } else {
      props.onEditStart(props.note)
    }
  }

  return props.curEditId === props.note.id ? (
    <textarea
      id={props.note.id}
      autoFocus
      data-min-rows={minRow}
      rows={minRow}
      cols="50"
      value={props.editContent}
      onClick={e => clickHandler(e, props.note.id)}
      onChange={e => {
        props.onEditChange(e.target.value)
        resize(e, props.note.id)
      }}
      onKeyDown={e => {
        if (!props.editContent) return
        if (e.key === 'Escape') {
          props.onEditEnd(props.curEditId, props.editContent)
        }
      }}
    />
  ) : (
    <div
      id={props.note.id}
      style={{
        whiteSpace: 'pre'
      }}
      onClick={e => clickHandler(e, props.note.id)}
    >
      {props.note.content}
    </div>
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

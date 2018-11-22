import React from 'react'
import { connect } from 'react-redux'

import { deleteNote, endEdit, changeEdit, startEdit } from './actions.js'

// https://codepen.io/tomhodgins/pen/baqMWL?editors=0010
const resize = ele => {
  let computed = getComputedStyle(ele)
  ele.style.height = 'inherit'
  let height =
    ele.scrollHeight +
    parseInt(computed.getPropertyValue('border-top-width'), 10) +
    parseInt(computed.getPropertyValue('padding-top'), 10) +
    parseInt(computed.getPropertyValue('padding-bottom'), 10) +
    parseInt(computed.getPropertyValue('border-bottom-width'), 10)

  ele.style.height = ''
  ele.style.height = height + 'px'
}

const ConnectEditable = props => {
  const clickHandler = e => {
    if (e) e.preventDefault()
    resize(e.target)
    if (e.metaKey) {
      props.onDeleteNote(props.note.id)
    } else {
      props.onEditStart(props.note)
    }
  }

  return props.curEditId === props.note.id ? (
    <textarea
      autoFocus
      cols="50"
      value={props.editContent}
      onClick={e => clickHandler(e, props.note.id)}
      onFocus={e => resize(e.target)}
      onChange={e => {
        props.onEditChange(e.target.value)
        resize(e.target)
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

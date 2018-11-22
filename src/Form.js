import React from 'react'
import { addNote, changeDraft } from './actions.js'
import { connect } from 'react-redux'

const resize = ele => {
  ele.style.height = 'inherit'
  ele.style.height = ele.scrollHeight + 'px'
}

const Form = props => {
  const keyHandler = e => {
    if (e.keyCode === 13 && e.metaKey) {
      if (e) e.preventDefault()
      props.addNote(props.draft.content)
    }
  }

  return (
    <form id="" className="Form" onSubmit={e => this.handleSubmit(e)}>
      <textarea
        id="upper-textarea"
        value={props.draft.content}
        onChange={e => {
          props.onNoteChange(e.target.value)
          resize(e.target)
        }}
        onKeyDown={e => keyHandler(e)}
      />
    </form>
  )
}

const mapDispatchToProps = dispatch => ({
  addNote: content => dispatch(addNote(content)),
  onNoteChange: content => dispatch(changeDraft(content))
})

const mapStateToProps = state => ({ ...state })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)

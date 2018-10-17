import React from 'react'
import { addNote, changeDraft } from './actions.js'
import { connect } from 'react-redux'

const Form = props => {
  const keyHandler = e => {
    if (e.keyCode === 13 && e.metaKey) {
      if (e) e.preventDefault()
      props.addNote(props.draft.content)
    }
  }

  return (
    <form onSubmit={(e) => this.handleSubmit(e)}>
      <label>
        Text:
        <textarea
          value={props.draft.content}
          onChange={(e) => props.onNoteChange(e.target.value)}
          onKeyDown={(e) => keyHandler(e)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

const mapDispatchToProps = dispatch => ({
  addNote: (content) => dispatch(addNote(content)),
  onNoteChange: (content) => dispatch(changeDraft(content)),
})

const mapStateToProps = state => ({ ...state })

export default connect(mapStateToProps, mapDispatchToProps)(Form)
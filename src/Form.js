import React, { useState } from 'react'
import { addNote, changeDraft } from './actions.js'
import { connect } from 'react-redux'

const Form = props => {
  const [height, setHeight] = useState('50px')
  const resize = () => {
    let ele = document.getElementById('upper-textarea')
    setHeight(ele.scrollHeight - 40 + 'px')
  }

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
        style={{
          height: height
        }}
        value={props.draft.content}
        onChange={e => {
          props.onNoteChange(e.target.value)
          resize()
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

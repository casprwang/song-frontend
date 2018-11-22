import React from 'react'
import { addNote, changeDraft } from './actions.js'
import { connect } from 'react-redux'

// https://codepen.io/tomhodgins/pen/baqMWL?editors=0010
const resize = ele => {
  let computed = getComputedStyle(ele)
  ele.style.height = 'inherit'
  let height =
    parseInt(computed.getPropertyValue('border-top-width'), 10) +
    parseInt(computed.getPropertyValue('padding-top'), 10) +
    ele.scrollHeight +
    parseInt(computed.getPropertyValue('padding-bottom'), 10) +
    parseInt(computed.getPropertyValue('border-bottom-width'), 10)

  ele.style.height = ''
  ele.style.height = height + 'px'
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

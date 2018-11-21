import React from 'react'
import { connect } from 'react-redux'

import Editable from './Editable'

const ConnectedList = props => {
  return (
    <ul>
      {props.notes.map((note, i) => (
        <li key={i}>
          <Editable note={note} />
        </li>
      ))}
    </ul>
  )
}

const mapStateToProps = state => ({
  notes: state.notes,
  isEditing: state.isEditing,
  editContent: state.editContent
})

const NoteList = connect(mapStateToProps)(ConnectedList)

export default NoteList

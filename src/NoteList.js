import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  notes: state.notes
})

const ConnectedList = ({notes}) =>
  <ul>
    {notes.map((note, i)=>
      <li key={i}>
        {note.content}
      </li>
    )}
  </ul>

const NoteList = connect(mapStateToProps)(ConnectedList)

export default NoteList

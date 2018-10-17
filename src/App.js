import React from 'react'
import { connect } from 'react-redux'
import { fetchNotes } from './actions.js'
import store from './store.js'
import './App.css'

import NoteList from './NoteList'
import Form from './Form'

store.dispatch(fetchNotes())

const App = () => {
  return (
    <div className="App">
      <h1>Hello</h1>
      <Form />
      <NoteList />
    </div>
  )
}


const mapStateToProps = state => ({ ...state })
const mapDispatchToProps = dispatch => ({
  loadNotes: () => dispatch(fetchNotes())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

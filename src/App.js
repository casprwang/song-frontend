import React, { Component } from 'react'
import './App.css'
import api from './services'

import Form from './Form'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: []
    }
  }
  async load() {
    this.setState({
      notes: await api.getNotes()
    })
  }
  async handleClick(id) {
    await api.deleteNoteById(id)
    await this.load()
  }
  async componentDidMount() {
    let res = await api.getNotes()
    console.log(res)
    await this.load()
  }
  render() {
    return (
      <div className="App">
        <h1>Hello</h1>
        <ul>
          {this.state.notes.map(note => <li onClick={() => this.handleClick(note.id)} key={note.id}>{note.content}</li>)}
        </ul>
        <Form load={() => this.load()} />
      </div>
    )
  }
}

export default App

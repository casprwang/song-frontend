import React, { Component } from 'react'
import api from './services'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }
  logKey(e) {
    if (e.keyCode === 13 && e.metaKey) {
      this.handleSubmit()
    }
  }
  async handleSubmit(e) {
    if (e) e.preventDefault()
    let res = await api.postNote(this.state.text)
    console.log(res, this.state.text)
    await this.props.load()
    this.setState({
      text: ''
    })
  }
  handleChange(e) {
    e.preventDefault()
    this.setState({
      text: e.target.value
    })
  }
  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label>
          Text:
          <textarea
            value={this.state.text}
            onChange={(e) => this.handleChange(e)}
            onKeyDown={(e) => this.logKey(e)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default Form

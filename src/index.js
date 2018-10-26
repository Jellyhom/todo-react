import React from 'react'
import ReactDOM from 'react-dom'
import TodoApp from './TodoApp'
import TodoModal from './TodoModel'

let model = new TodoModal()

function render () {
  ReactDOM.render(<TodoApp model={model}/>, document.getElementById('root'))
}

model.subscribe(render)
render()

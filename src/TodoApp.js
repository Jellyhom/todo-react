import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import TodoHeader from './TodoHeader'
import TodoItem from './TodoItem'
import TodoFooter from './TodoFooter'

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props) // 父类的构造函数
    this.state = { // 初始化默认状态
      todos: [
        {id: Math.random(), title: '今天学习React', completed: false},
        {id: Math.random(), title: '明天学习Vue', completed: true}
      ]
    }
  }

  toggle = (id) => {
    let todos = this.state.todos
    todos = todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
    this.setState({todos})
  }

  addTodo = (todo) => {
    todo = Object.assign({}, {id: Date.now(), completed: false}, todo) // es5语法
    // todo = {id: Date.now(), completed: false, ...todo} // es7语法，...对象展开符
    let todos = this.state.todos
    todos.push(todo)
    this.setState({todos})
  }

  render() {
    let main = (
      <ul className="list-group">
        {
          this.state.todos.map((todo, index) => <TodoItem toggle={this.toggle} todo={todo} key={index}/>)
        }
      </ul>
    )
    return (
      <div className="container" style={{marginTop: 20}}>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="panel panel-default">
              <div className="panel-heading">
                <TodoHeader addTodo={this.addTodo}/>
              </div>
              <div className="panel-body">
                {main}
              </div>
              <div className="panel-footer">
                <TodoFooter/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import TodoHeader from './TodoHeader'
import TodoItem from './TodoItem'
import TodoFooter from './TodoFooter'
import * as filterTypes from "./filter-types"

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props) // 父类的构造函数
    this.state = { // 初始化默认状态
      todos: [],
      filterType: filterTypes.ALL
    }
  }

  remove = id => {
    let todos = this.state.todos
    let index = todos.findIndex(todo => todo.id === id)
    todos.splice(index, 1)
    this.setState({todos})
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

  toggleAll = (event) => {
    let checked = event.target.checked
    let todos = this.state.todos
    todos.map(todo => todo.completed = checked)
    this.setState({todos})
  }

  changeFilterType = (filterType) => {
    this.setState({filterType})
  }

  clearCompleted = () => {
    let todos = this.state.todos
    todos = todos.filter(todo => !todo.completed)
    this.setState({todos})
  }

  render() {
    let todos = this.state.todos
    let activeTodoCount = todos.reduce((count, todo) => { // es5
      return count + (todo.completed ? 0 : 1)
    }, 0)
    let completedTodoCount = todos.length - activeTodoCount
    let showTodos = todos.filter(todo => {
      switch (this.state.filterType) {
        case filterTypes.ACTIVE: return !todo.completed
        case filterTypes.COMPLETED: return todo.completed
        default: return true
      }
    })
    let main = (
      <ul className="list-group">
        {
          todos.length ?
            <li className="list-group-item">
              <input type="checkbox"
                     checked={activeTodoCount === 0}
                     onChange={this.toggleAll}/>
              {activeTodoCount === 0 ? '全部取消' : '全部选中'}
            </li>
           : null
        }
        {
          showTodos.map((todo, index) =>
            <TodoItem toggle={this.toggle}
                      todo={todo}
                      remove={this.remove}
                      key={index}/>)
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
                <TodoFooter activeTodoCount={activeTodoCount}
                            filterType={this.state.filterType}
                            completedTodoCount={completedTodoCount}
                            changeFilterType={this.changeFilterType}
                            clearCompleted={this.clearCompleted}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

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
      // todos: [],
      filterType: filterTypes.ALL
    }
  }

  changeFilterType = (filterType) => {
    this.setState({filterType})
  }

  render() {
    let todos = this.props.model.todos
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
                     onChange={this.props.model.toggleAll}/>
              {activeTodoCount === 0 ? '全部取消' : '全部选中'}
            </li>
           : null
        }
        {
          showTodos.map((todo, index) =>
            <TodoItem toggle={this.props.model.toggle}
                      todo={todo}
                      remove={this.props.model.remove}
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
                <TodoHeader addTodo={this.props.model.addTodo}/>
              </div>
              <div className="panel-body">
                {main}
              </div>
              <div className="panel-footer">
                <TodoFooter activeTodoCount={activeTodoCount}
                            filterType={this.state.filterType}
                            completedTodoCount={completedTodoCount}
                            changeFilterType={this.changeFilterType}
                            clearCompleted={this.props.model.clearCompleted}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

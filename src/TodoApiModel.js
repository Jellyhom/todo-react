import $ from 'jquery'

export default class TodoModel {
  constructor () {
    this.todos = [] // 存放着所有的todos
    // 这里可以注册监听器，当模型数据发生变化之后会调用这些监听函数
    this.listeners = []
    this.init()
  }

  init () {
    $.ajax({
      url: 'http://localhost:3000/todos',
      type: 'GET',
      success:(todos) => { // 一定要让服务器返回最新的todos数组
        // console.log(todos);
        // if(todos.length)
        // this.notify(todos)
      }
    })
  }

  // 订阅 on(type, listener); emit发布
  subscribe (listener) {
    this.listeners.push(listener)
  }

  emit () {
    this.listeners.forEach(listener => listener())
  }

  notify (todos) {
    this.todos = todos
    this.emit()
  }

  // 增加todo
  addTodo = (todo) => {
    $.ajax({
      url: 'http://localhost:3000/todos/addTodo',
      type: 'POST',
      data: todo,
      success (todos) { // 一定要让服务器返回最新的todos数组
        this.notify(todos)
      }
    })
  }

  toggle = (id) => {
    $.ajax({
      url: 'http://localhost:3000/todos/toggle',
      type: 'GET',
      data: {id},
      success (todos) { // 一定要让服务器返回最新的todos数组
        this.notify(todos)
      }
    })
  }

  remove = (id) => {
    $.ajax({
      url: 'http://localhost:3000/todos/remove',
      type: 'GET',
      data: {id},
      success (todos) { // 一定要让服务器返回最新的todos数组
        this.notify(todos)
      }
    })
  }

  toggleAll = (event) => {
    let checked = event.target.checked
    $.ajax({
      url: 'http://localhost:3000/todos/toggleAll',
      type: 'GET',
      data: {checked},
      success (todos) { // 一定要让服务器返回最新的todos数组
        this.notify(todos)
      }
    })
  }

  clearCompleted = () => {
    $.ajax({
      url: 'http://localhost:3000/todos/clearCompleted',
      type: 'GET',
      success (todos) { // 一定要让服务器返回最新的todos数组
        this.notify(todos)
      }
    })
  }
}

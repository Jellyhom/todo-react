import React from 'react'
import * as filterTypes from './filter-types'

export default class TodoFooter extends React.Component {
  render () {
    return (
      <div className="row">
        <div className="col-md-3">
          <a href="" style={{textDecoration: 'none'}}>
            你有<span className="badge">{this.props.activeTodoCount}</span>件待办
          </a>
        </div>
        <div className="col-md-6" style={{textAlign:'center'}}>
          <button className={`btn ${this.props.filterType === filterTypes.ALL?'btn-success':'btn-default'} btn-sm`}
                  onClick={()=>this.props.changeFilterType(filterTypes.ALL)}>全部</button>
          <button className={`btn ${this.props.filterType === filterTypes.ACTIVE?'btn-success':'btn-default'} btn-sm`}
                  style={{marginLeft:10}}
                  onClick={()=>this.props.changeFilterType(filterTypes.ACTIVE)}>未完成</button>
          <button className={`btn ${this.props.filterType === filterTypes.COMPLETED?'btn-success':'btn-default'} btn-sm`}
                  style={{marginLeft:10}}
                  onClick={()=>this.props.changeFilterType(filterTypes.COMPLETED)}>已完成</button>
        </div>
        <div className="col-md-3"></div>
      </div>
    )
  }
}
import React, { Component } from 'react'
export default class TableItem extends Component {
  render() {
    const {item, index} = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{item.before}</td>
        <td>{item.after}</td>
        <td>
          { item.mode === 'up' && 'Up ' }
          { item.mode === 'up' && <span className='fa fa-arrow-up'></span> }
          { item.mode === 'down' && 'Down ' }
          { item.mode === 'down' && <span className='fa fa-arrow-down'></span> }
        </td>
        <td>
            { item.guessResult && (<span className='text-success'><span className='fa fa-check'></span> Success</span>) }
            { !item.guessResult && (<span className='text-danger'><span className='fa fa-times'></span> Failure</span>) }
        </td>
      </tr>
    )
  }
}

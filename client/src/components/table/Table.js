import React, { Component } from 'react';
import Pagination from "react-js-pagination";

import TableItem from './TableItem';

export default class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePage: 1
          };
    }

    handlePageChange = pageNumber => {
        this.setState({activePage: pageNumber});
      }

  render() {
    const { items } = this.props;
    const { activePage } = this.state;

    const tableItems = items.slice((activePage - 1) * 10, activePage * 10).map((value, index) => <TableItem key={value._id} item={value} index={(activePage - 1) * 10 + index} />);

    return (
        <div>
            <div className='bg-dark rounded-lg'>
                <table className="table table-borderless text-white text-center">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Before</th>
                            <th>After</th>
                            <th>Guess</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        { items.length > 0 && tableItems }
                    </tbody>
                </table>
                { items.length === 0 && <div className='text-center text-white'>No records...</div> }
            </div>
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={items.length}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                    innerClass='pagination justify-content-center'
                    prevPageText={<span className='fa fa-angle-left'></span>}
                    nextPageText={<span className='fa fa-angle-right'></span>}
                    firstPageText={<span className='fa fa-angle-double-left'></span>}
                    lastPageText={<span className='fa fa-angle-double-right'></span>}
                />
        </div>
        )
  }
}

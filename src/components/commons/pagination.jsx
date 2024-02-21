import React, { Component } from "react";
import _ from "lodash";
import PropTypes from 'prop-types';

class Pagination extends Component {
  render() {
    const { total, pageSize, currentPage, onClick } = this.props;
    const numberOfPage = Math.ceil(total / pageSize);
    if(numberOfPage === 1) return null;
    
    const pages = _.range(1, numberOfPage + 1);

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map((page) => {
            return (
              <li
                key={page}
                className={
                  currentPage === page ? "page-item active" : "page-item"
                }
                style={{cursor:"pointer"}}
              >
                <a className="page-link" onClick={() => onClick(page)}>
                  {page}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired, 
  pageSize: PropTypes.number.isRequired, 
  currentPage: PropTypes.number.isRequired, 
  onClick: PropTypes.func.isRequired
}


export default Pagination;

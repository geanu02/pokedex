import React from 'react'
import Button from '@mui/material/Button';

export default function PageControl({ gotoNextPage, gotoPrevPage, postsPerPage, totalPosts, paginate }) {

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
      pageNumbers.push(i)
  }

  return (
    <div className="page-control-container">
      <div className="page-control-top">
        <Button onClick={gotoPrevPage} disabled={(gotoPrevPage ? false : true)} variant="contained">Previous</Button>
        <Button onClick={() => paginate(1, 5)} variant="outlined">5</Button>
        <Button onClick={() => paginate(1, 10)} variant="outlined">10</Button>
        <Button onClick={() => paginate(1, 15)}variant="outlined">15</Button>
        <Button onClick={gotoNextPage} disabled={(gotoNextPage ? false : true)} variant="contained">Next</Button>
      </div>
      <div className="page-control-bot">
        <nav>
          <ul className="pagination">
            {pageNumbers.map(number => (
              <li key={number} className="pag-list-item">
                <a onClick={() => paginate(number, postsPerPage)} href="!#" className="pag-list-a">{number}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

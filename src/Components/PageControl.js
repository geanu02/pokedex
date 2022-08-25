import React from 'react'
import Button from '@mui/material/Button';

export default function PageControl({ gotoNextPage, gotoPrevPage, showItems, postsPerPage, totalPosts, paginate }) {

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
      pageNumbers.push(i)
  }

  return (
    <>
        <Button onClick={gotoPrevPage} disabled={(gotoPrevPage ? false : true)} variant="contained">Previous</Button>
        <Button onClick={() => showItems(5)} variant="outlined">5</Button>
        <Button onClick={() => showItems(10)} variant="outlined">10</Button>
        <Button onClick={() => showItems(50)}variant="outlined">50</Button>
        <Button onClick={gotoNextPage} disabled={(gotoNextPage ? false : true)} variant="contained">Next</Button>
        <nav>
          <ul className="pagination">
            {pageNumbers.map(number => (
              <li key={number}>
                <a onClick={() => paginate()} href="!#">{number}</a>
              </li>
            ))}
          </ul>
        </nav>
    </>
  )
}

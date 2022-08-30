import React from 'react'
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
      <div className="page-control-bottom">
        <Stack spacing={2}>
          <Pagination 
            onChange={e => paginate(e.target.textContent, postsPerPage)}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              color: "#000"
            }}
            count={pageNumbers.length}
            variant="outlined"
            shape="rounded"
            color="primary"

            // Task 1:
            // Remove 'Previous' & 'Next' Buttons and use Arrow Buttons
            // on Pagination component to drive instead

            // Task 2:
            // Selected or highlighted page number should be controlled to 
            // synchronize both Pagination components (top & bottom)

            // Task 3:
            // If number of items per page is changed, selected or 
            // highlighted page number should go back to Page 1

            />
        </Stack>
      </div>
    </div>
  )
}

import React from 'react'
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export default function PageControl({ gotoNextPage, gotoPrevPage, postsPerPage, totalPosts, pageNum, setPageNum, paginate }) {

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
      pageNumbers.push(i)
  }

  const handleChange = (event, value) => {
    setPageNum(value)
    paginate(event.target.textContent, postsPerPage)
  }

  const handlePostPerPageChange = event => {
    setPageNum(1)
    paginate(1, event.target.textContent)
  }

  return (
    <div className="page-control-container">
      <div className="page-control-top">
        <Button onClick={handlePostPerPageChange} variant="outlined">5</Button>
        <Button onClick={handlePostPerPageChange} variant="outlined">10</Button>
        <Button onClick={handlePostPerPageChange} variant="outlined">15</Button>
        <Button onClick={handlePostPerPageChange} variant="outlined">20</Button>
      </div>
      <div className="page-control-bottom">
        <Stack direction="row" spacing={2}>
          <IconButton 
            aria-label="Previous page" 
            onClick={gotoPrevPage} 
            disabled={(gotoPrevPage ? false : true)}
          >
              <NavigateBeforeIcon />
          </IconButton>
          <Pagination 
            hidePrevButton
            hideNextButton
            onChange={handleChange}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              color: "#000"
            }}
            count={pageNumbers.length}
            page={pageNum}
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
          <IconButton 
            aria-label="Next page" 
            onClick={gotoNextPage} 
            disabled={(gotoNextPage ? false : true)}
          >
            <NavigateNextIcon />
          </IconButton>
        </Stack>
      </div>
    </div>
  )
}

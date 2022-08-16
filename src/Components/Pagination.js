import React from 'react'
import Button from '@mui/material/Button';

export default function Pagination({ gotoNextPage, gotoPrevPage, itemsFive, itemsTen, itemsFifty }) {
  return (
    <>
        {/* {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
        <button onClick={itemsFive}>5</button>
        <button onClick={itemsTen}>10</button>
        <button onClick={itemsFifty}>50</button>
        {gotoNextPage && <button onClick={gotoNextPage}>Next</button>} */}
        <Button onClick={gotoPrevPage} disabled={(gotoPrevPage ? false : true)} variant="contained">Previous</Button>
        <Button onClick={itemsFive} variant="outlined">5</Button>
        <Button onClick={itemsTen} variant="outlined">10</Button>
        <Button onClick={itemsFifty}variant="outlined">50</Button>
        <Button onClick={gotoNextPage} disabled={(gotoNextPage ? false : true)} variant="contained">Next</Button>
    </>
  )
}

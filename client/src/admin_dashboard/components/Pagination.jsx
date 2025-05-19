"use client"

function Pagination({ currentPage, totalPages, onNextPage, onPrevPage }) {
  return (
    <div className="paginationBar">
      <div className="paginationSection left">
        {currentPage > 1 && (
          <button className="prev-btn" onClick={onPrevPage}>
            &lt; Previous
          </button>
        )}
      </div>
      <div className="paginationSection center">
        <span className="page-info">
          <span className="page-info">Page {currentPage} of {totalPages}</span>
        </span>
      </div>
      <div className="paginationSection right">
        {currentPage < totalPages && (
          <button className="next-btn" onClick={onNextPage}>
            Next &gt;
          </button>
        )}  
      </div>  
    </div>
  )
}

export default Pagination

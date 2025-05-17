"use client"

function Pagination({ currentPage, totalPages, onNextPage, onPrevPage }) {
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button className="prev-button" onClick={onPrevPage}>
          <span className="prev-icon">‹</span> Previous
        </button>
      )}

      <span className="page-info">
        Page {currentPage} of {totalPages}
      </span>

      <button className="next-button" onClick={onNextPage}>
        Next <span className="next-icon">›</span>
      </button>
    </div>
  )
}

export default Pagination

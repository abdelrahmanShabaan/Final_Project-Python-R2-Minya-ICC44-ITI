// import React, { useState } from "react";

// const Pagination = ({ handlePageNumClick, totalPages, currentPage }) => {
//   const pageBtnsPerPage = 5;
//   const [currentPageBtnsGroup, setCurrentPageBtnsGroup] = useState(1);

//   const startPage = (currentPageBtnsGroup - 1) * pageBtnsPerPage + 1;
//   const endPage = Math.min(currentPageBtnsGroup * pageBtnsPerPage, totalPages);

//   const visiblePages = Array.from(
//     { length: endPage - startPage + 1 },
//     (_, index) => startPage + index
//   );

//   const handleNextGroup = () => {
//     if (currentPageBtnsGroup * pageBtnsPerPage < totalPages) {
//       setCurrentPageBtnsGroup(currentPageBtnsGroup + 1);
//     }
//   };

//   const handlePrevGroup = () => {
//     if (currentPageBtnsGroup > 1) {
//       setCurrentPageBtnsGroup(currentPageBtnsGroup - 1);
//     }
//   };

//   return (
//     <>
//       <nav
//         className="mt-2 mb-0 p-2 pagination"
//         aria-label="Page navigation example"
//         style={{ display: "flex", justifyContent: "center" }}
//       >
//         <ul className="pagination">
//           <li className={`page-item ${currentPageBtnsGroup === 1 && "disabled"}`}>
//             <button
//               className="page-link border border-dark"
//               onClick={handlePrevGroup}
//               disabled={currentPageBtnsGroup === 1}
//             >
//               Previous
//             </button>
//           </li>

//           {visiblePages.map((page) => (
//             <li
//               key={page}
//               className={`page-item ${currentPage === page && "active"}`}
//             >
//               <button
//                 className="page-link shadow-none border border-dark"
//                 onClick={() => handlePageNumClick(page)}
//               >
//                 {page}
//               </button>
//             </li>
//           ))}

//           <li className={`page-item ${currentPageBtnsGroup * pageBtnsPerPage >= totalPages && "disabled"}`}>
//             <button
//               className="page-link border border-dark"
//               onClick={handleNextGroup}
//               disabled={currentPageBtnsGroup * pageBtnsPerPage >= totalPages}
//             >
//               Next
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </>
//   );
// };

// export default Pagination;

import React, { useState } from "react";
import "./Pagination.css";

const Pagination = ({ handlePageNumClick, totalPages, currentPage }) => {
  const pageBtnsPerPage = 5;
  const [currentPageBtnsGroup, setCurrentPageBtnsGroup] = useState(1);

  const startPage = (currentPageBtnsGroup - 1) * pageBtnsPerPage + 1;
  const endPage = Math.min(currentPageBtnsGroup * pageBtnsPerPage, totalPages);

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const handleNextGroup = () => {
    if (currentPageBtnsGroup * pageBtnsPerPage < totalPages) {
      setCurrentPageBtnsGroup(currentPageBtnsGroup + 1);
    }
  };

  const handlePrevGroup = () => {
    if (currentPageBtnsGroup > 1) {
      setCurrentPageBtnsGroup(currentPageBtnsGroup - 1);
    }
  };

  return (
    <>
      <nav
        className="pagination-container"
        aria-label="Page navigation example"
      >
        <ul className="pagination">
          <li
            className={`pagination-item ${
              currentPageBtnsGroup === 1 && "disabled"
            }`}
          >
            <button
              className="pagination-btn"
              onClick={handlePrevGroup}
              disabled={currentPageBtnsGroup === 1}
            >
              Previous
            </button>
          </li>

          {visiblePages.map((page) => (
            <li
              key={page}
              className={`pagination-item ${currentPage === page && "active"}`}
            >
              <button
                className="pagination-btn"
                onClick={() => handlePageNumClick(page)}
              >
                {page}
              </button>
            </li>
          ))}

          <li
            className={`pagination-item ${
              currentPageBtnsGroup * pageBtnsPerPage >= totalPages && "disabled"
            }`}
          >
            <button
              className="pagination-btn"
              onClick={handleNextGroup}
              disabled={currentPageBtnsGroup * pageBtnsPerPage >= totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;

import React from "react";

const Pagination = ({ currentPage, eventsPerPage, totalEvents, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalEvents / eventsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={number === currentPage ? "active" : ""}>
            <a
              href="!#"
              onClick={(e) => {
                e.preventDefault();
                if (number !== currentPage) {
                  paginate(number);
                }
              }}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

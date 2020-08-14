import React from "react"
import "./pagination.scss"

export default function Pagination({
  currentPage,
  postPerPage,
  totalPosts,
  paginate,
}) {
  const [temp, setTemp] = React.useState(currentPage)
  const lengthOfPosts = Math.ceil(totalPosts / postPerPage)
  const pageNumbers = []
  const limitPage = 3

  for (let i = temp; i < temp + limitPage; i++) {
    if (i > lengthOfPosts) break
    pageNumbers.push(i)
  }

  return (
    <nav className="pagination-app">
      <ul>
        {temp - limitPage < 1 ? null : (
          <li className="arrow-left">
            <a onClick={() => setTemp(temp - limitPage)} role="button">
              <i className="fas fa-angle-left"></i>
            </a>
          </li>
        )}
        {pageNumbers.map((number) => {
          return (
            <li
              className={currentPage === number ? "active" : null}
              key={number}
            >
              <a onClick={() => paginate(number)} role="button">
                {number}
              </a>
            </li>
          )
        })}
        {temp + limitPage > lengthOfPosts ? null : (
          <li className="arrow-right">
            <a onClick={() => setTemp(temp + limitPage)} role="button">
              <i className="fas fa-angle-right"></i>
            </a>
          </li>
        )}
      </ul>
    </nav>
  )
}

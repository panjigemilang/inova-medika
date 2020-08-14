import React from "react"

export default function Menu({ menuActive, setMenuActive }) {
  return (
    <nav className="menu">
      <ul>
        <li
          onClick={() => setMenuActive(1)}
          className={menuActive === 1 ? "active" : ""}
        >
          General
        </li>
        <li
          onClick={() => setMenuActive(2)}
          className={menuActive === 2 ? "active" : ""}
        >
          Orders
        </li>
      </ul>
    </nav>
  )
}

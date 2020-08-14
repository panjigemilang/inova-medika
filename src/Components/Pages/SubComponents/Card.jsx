import React from "react"
import Skeleton from "react-loading-skeleton"

export default function Card({
  title,
  description,
  func = null,
  icon = "fas fa-home",
  pasive = false,
}) {
  return (
    <div className={`card ${pasive ? "pasive" : ""}`}>
      {pasive ? (
        <div className="row">
          <div className="col-12">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
      ) : (
        <div className="row" onClick={func}>
          <div className="col-3">
            {<i className={icon}></i> || <Skeleton circle={true} count={1} />}
          </div>
          <div className="col-9">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

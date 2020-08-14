import React from "react"
import Index from "../../Context"
import "./loading.scss"

export default function Loading() {
  const {
    toggleLoading,
    setToggleLoading,
    transition,
    setActive,
  } = React.useContext(Index)
  const [closing, setClosing] = React.useState(false)
  const firstRender = React.useRef(true)

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (toggleLoading) {
      setClosing(!closing)
    }
    if (transition === "mounted" || transition === "unmounted") {
      setToggleLoading(!toggleLoading)
    }
  }, [toggleLoading])

  return (
    <>
      <div
        className={`block-1 ${transition === "mounting" ? "show" : ""}`}
      ></div>
      <div
        className={`block-2 ${transition === "mounting" ? "show" : ""}`}
      ></div>
      <div className={`block-3 ${closing ? "tutup" : ""}`}></div>
      <div className={`loading-container ${closing ? "tutup" : "show"}`}>
        <div className="container">
          <h1>Loading</h1>
        </div>
      </div>
    </>
  )
}

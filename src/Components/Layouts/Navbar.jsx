import React from "react"
import Index from "../../Context"
import DelayLink from "react-delay-link"
import "./Navbar.scss"
import Logo from "../../Assets/img/logo.png"
import useDelayedUnmounting from "../Utils/useDelayComponent"

function Navbar() {
  const { active, setActive, setToggleLoading } = React.useContext(Index)
  const firstRender = React.useRef(true)
  const [transition, show] = useDelayedUnmounting(1300)
  const location = window.location.pathname
  const delay = 500

  React.useEffect(() => {
    let timeoutId,
      timeout = 300

    if (firstRender.current) {
      firstRender.current = false
      return
    }

    if (transition === "mounting") setToggleLoading(!setToggleLoading)

    if (transition === "mounted") {
      timeoutId = setTimeout(() => {
        setToggleLoading(!setToggleLoading)
      }, timeout)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [transition])

  return (
    <nav className={`custom-navbar ${location === "/" ? "hide" : ""}`}>
      <ul>
        <li>
          <img src={Logo} alt="logo.png" />
        </li>
        <li
          className={active === 1 ? "active" : ""}
          onClick={() => setActive(1)}
        >
          <i className="fas fa-user-injured"></i>
        </li>
        <li
          className={active === 2 ? "active" : ""}
          onClick={() => setActive(2)}
        >
          <i className="fas fa-capsules"></i>
        </li>
        <li>
          <DelayLink delay={delay} clickAction={show} to="/">
            <i className="fas fa-sign-out-alt"></i>
          </DelayLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar

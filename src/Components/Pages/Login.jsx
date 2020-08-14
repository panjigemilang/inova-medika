import React from "react"
import { withRouter } from "react-router-dom"
import DelayLink from "react-delay-link"
import Index from "../../Context"
import "./login.scss"
import Logo from "../../Assets/img/logo.png"

function Login({ history }) {
  const { toggleLoading, setToggleLoading } = React.useContext(Index)
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const errors = React.useRef({})

  React.useEffect(() => {
    setToggleLoading(!toggleLoading)
  }, [])

  React.useEffect(() => {
    if (loading) setLoading(!loading)
  }, [errors.current])

  const onSubmit = (e) => {
    e.preventDefault()

    errors.current = {}
    setLoading(!loading)

    if (username.length < 1 || username !== "admin") {
      errors.current.username = "Username can't be empty or username is wrong"
    }

    if (password.length < 1 || password !== "admin123") {
      errors.current.password = "Password can't be empty or password is wrong"
    }

    if (errors.current.username || errors.current.password) return

    setLoading(!loading)
    history.push("/dashboard")
  }

  return (
    <div className="app">
      <div className="login-form container">
        <div className="logo-container">
          <img src={Logo} alt="logo.png" />
        </div>
        <form>
          <input
            type="text"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.current.username && (
            <small className="text-danger">{errors.current.username}</small>
          )}
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.current.password && (
            <small className="text-danger">{errors.current.password}</small>
          )}
          <button onClick={(e) => onSubmit(e)}>
            {loading && (
              <>
                <i className="fas fa-spinner fa-spin"></i>&ensp;
              </>
            )}
            LOG IN
          </button>
        </form>
      </div>
    </div>
  )
}

export default withRouter(Login)

import React from "react"

export default React.createContext({
  active: 1,
  transition: false,
  toggleLoading: false,
  setTransition: () => {},
  setToggleLoading: () => {},
})

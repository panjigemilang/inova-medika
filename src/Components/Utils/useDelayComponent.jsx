import React from "react"
import Index from "../../Context"

export default function useDelayedUnmounting(time = 100) {
  const { transition, setTransition } = React.useContext(Index)

  const show = () => {
    if (transition === "mounting") {
      return
    }
    setTransition("mounting")
  }

  React.useEffect(() => {
    let timeoutId
    if (transition === "mounting") {
      timeoutId = setTimeout(() => {
        setTransition("mounted")
      }, time)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [transition, time])

  return [transition, show]
}

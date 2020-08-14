import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import IndexContext from "./Context"
import Navbar from "./Components/Layouts/Navbar"
import Loading from "./Components/Commons/Loading"
import Login from "./Components/Pages/Login"
import Dashboard from "./Components/Pages/Dashboard"
import Patient from "./Components/Pages/Patient"

function App() {
  const [transition, setTransition] = React.useState("mounting")
  const [active, setActive] = React.useState(1)
  const [toggleLoading, setToggleLoading] = React.useState(false)
  const [patients, setPatient] = React.useState([
    {
      no: 1,
      name: "Panji Gemilang",
      gender: "Male",
      age: 21,
      birthdate: "03/12/1998",
      disease: "None",
    },
  ])
  const [medicines, setMedicine] = React.useState([
    {
      no: 1,
      name: "Tramadol",
      type: "syrup",
      part: "head",
    },
  ])
  const contextProvider = React.useMemo(
    () => ({
      transition,
      setTransition,
      toggleLoading,
      setToggleLoading,
      active,
      setActive,
      patients,
      setPatient,
      medicines,
      setMedicine,
    }),
    [
      transition,
      setTransition,
      toggleLoading,
      setToggleLoading,
      active,
      setActive,
      patients,
      setPatient,
      medicines,
      setMedicine,
    ]
  )

  return (
    <Router>
      <IndexContext.Provider value={contextProvider}>
        <div className="App">
          <Navbar />
          {transition !== "mounted" && <Loading />}
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/:patient_name" component={Patient} />
          </Switch>
        </div>
      </IndexContext.Provider>
    </Router>
  )
}

export default App

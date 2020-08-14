import React from "react"
import { withRouter } from "react-router-dom"
import Index from "../../Context"
import ProfilePicture from "../../Assets/img/pp.jpeg"
import Menu from "./SubComponents/Menu"
import Skeleton from "react-loading-skeleton"
import "./patient.scss"

function Patient({ history, match }) {
  const { patients, toggleLoading, setToggleLoading } = React.useContext(Index)
  const [menuActive, setMenuActive] = React.useState(1)
  const patient = patients.filter(
    (item) => item.name === match.params.patient_name
  )[0]

  React.useEffect(() => {
    setToggleLoading(!toggleLoading)
  }, [])

  return (
    <div className="patient-app">
      <i
        className="far fa-arrow-alt-circle-left"
        onClick={() => history.goBack()}
      ></i>
      <div className="row">
        <div className="col-3">
          <div className="profile">
            <div className="img-box">
              {<img src={ProfilePicture} alt="pp.jpg" /> || (
                <Skeleton circle={true} count={1} />
              )}
            </div>
            <div className="data">
              <h2>{patient.name}</h2>
              <div className="row">
                <div className="col-6 text-muted">Gender</div>
                <div className="col-6">Male</div>
                <div className="col-6 text-muted">Age</div>
                <div className="col-6">{patient.age}</div>
                <div className="col-6 text-muted">Birthdate</div>
                <div className="col-6">{patient.birthdate}</div>
                <div className="col-6 text-muted">Disease</div>
                <div className="col-6">{patient.disease}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-9">
          <Menu menuActive={menuActive} setMenuActive={setMenuActive} />
          <div className="data">
            {menuActive === 1 && (
              <>
                <span className="text-muted">PERSONAL DETAILS</span>
                <div className="row">
                  <div className="col-2">
                    <p className="text-muted">Name</p>
                    <p>{patient.name}</p>
                  </div>
                  <div className="col-2">
                    <p className="text-muted">Age</p>
                    <p>{patient.age}</p>
                  </div>
                  <div className="col-2">
                    <p className="text-muted">Birthdate</p>
                    <p>{patient.birthdate}</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted">Disease</p>
                    <p>{patient.disease}</p>
                  </div>
                </div>
              </>
            )}
            {menuActive === 2 && (
              <>
                <span className="text-muted">INVOICE</span>
                <div className="row">
                  <div className="col-4">
                    <p className="text-muted">Name</p>
                    <p>Tramadol</p>
                    <p>Panadox</p>
                  </div>
                  <div className="col-2">
                    <p className="text-muted">Type</p>
                    <p>Syrup</p>
                    <p>Pill</p>
                  </div>
                  <div className="col-2">
                    <p className="text-muted">Part</p>
                    <p>Head</p>
                    <p>Stomach</p>
                  </div>
                  <div className="col-2">
                    <p className="text-muted">Quantity</p>
                    <p>1</p>
                    <p>3</p>
                  </div>
                  <div className="col-2">
                    <p className="text-muted">Price</p>
                    <p>200.000</p>
                    <p>100.000</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-10"></div>
                  <div className="col-2">
                    <strong>Total</strong>
                    <h3>300.000</h3>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Patient)

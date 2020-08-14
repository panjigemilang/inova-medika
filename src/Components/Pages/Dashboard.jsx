import React from "react"
import "./dashboard.scss"
import Index from "../../Context"
import Card from "./SubComponents/Card"
import Table from "./SubComponents/Table"
import Modals from "../Commons/Modals"
import Pagination from "../Commons/Pagination"

export default function Dashboard() {
  const {
    active,
    patients,
    medicines,
    toggleLoading,
    setToggleLoading,
  } = React.useContext(Index)
  const [show, setShow] = React.useState(false)
  const [type, setType] = React.useState("patient")
  const [page, setPage] = React.useState(1)
  const [postPerPage, setPostPerPage] = React.useState(2)

  // get current posts
  const indexOfLastPost = page * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const currentPatient = patients.slice(indexOfFirstPost, indexOfLastPost)
  const currentMedicine = medicines.slice(indexOfFirstPost, indexOfLastPost)

  React.useEffect(() => {
    setToggleLoading(!toggleLoading)
  }, [])

  React.useEffect(() => {
    if (active === 1) setType("patient")
    else setType("medicine")
  }, [active])

  // paginate function
  const paginate = (pageNumber) => {
    window.scrollTo(0, 0)
    setPage(pageNumber)
  }

  const addPatient = () => {
    setShow(!show)
    setType("patient")
  }

  const addMedicine = () => {
    setShow(!show)
    setType("medicine")
  }

  return (
    <>
      <Modals show={show} setShow={setShow} type={type} />
      <div className={`dashboard-app ${show ? "blur" : ""}`}>
        <div className="title">
          <h1>Dashboard Overview</h1>
        </div>
        <div className="features">
          <Card
            func={addPatient}
            title="New Patient"
            description="Add new patient"
            icon="fas fa-user-plus"
          ></Card>
          <Card
            func={addMedicine}
            title="New Medicine"
            description="Add new medicine"
            icon="fas fa-plus-square"
          ></Card>
          <Card
            title={patients.length}
            description="Patient handeld"
            icon=""
            pasive={true}
          ></Card>
        </div>
        <div className="patient-list">
          <h2>{type === "patient" ? "Patient" : "Medicine"} List</h2>
          <hr />
          <Table
            currentMedicine={currentMedicine}
            currentPatient={currentPatient}
            page={page}
            setPage={setPage}
          />
          {type === "patient" && (
            <Pagination
              currentPage={page}
              paginate={paginate}
              postPerPage={postPerPage}
              totalPosts={patients.length}
            />
          )}
          {type === "medicine" && (
            <Pagination
              currentPage={page}
              paginate={paginate}
              postPerPage={postPerPage}
              totalPosts={medicines.length}
            />
          )}
        </div>
      </div>
    </>
  )
}

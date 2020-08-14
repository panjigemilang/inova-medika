import React from "react"
import Index from "../../Context"
import "./modals.scss"

export default function Modals({ show, setShow, type }) {
  const { patients, setPatient, medicines, setMedicine } = React.useContext(
    Index
  )
  const [name, setName] = React.useState("")
  const [gender, setGender] = React.useState("Male")
  const [age, setAge] = React.useState("")
  const [birthdate, setBirthdate] = React.useState("")
  const [disease, setDisease] = React.useState("")
  const [medType, setMedType] = React.useState("")
  const [part, setPart] = React.useState("")
  const [loading, setloading] = React.useState(false)
  const [errors, setErrors] = React.useState({})

  const onSubmit = () => {
    setloading(!loading)
    setErrors({})

    if (name.length < 1) {
      setErrors({ name: "Name can't be empty" })
      return
    }

    if (type === "patient") {
      const newPatient = {
        no: patients.length + 1,
        name,
        age,
        birthdate,
        disease,
      }

      setPatient([...patients, newPatient])
    } else {
      const newMedicine = {
        no: medicines.length + 1,
        name,
        type: medType,
        part,
      }

      setMedicine([...medicines, newMedicine])
    }
  }

  const onClose = () => {
    setShow(!show)
    setErrors({})
  }

  React.useEffect(() => {
    if (loading) {
      setloading(!loading)
      setShow(!show)
    }
  }, [patients, medicines])

  React.useEffect(() => {
    if (loading) setloading(!loading)
  }, [errors])

  React.useEffect(() => {
    if (!show) {
      setName("")
      setAge("")
      setDisease("")
    }
  }, [show])

  return (
    <div className={`modals-app ${show ? "" : "hide"}`}>
      <div className="overlay"></div>
      <div className="modal-custom">
        <i className="fas fa-times-circle" onClick={() => onClose()}></i>
        {type === "patient" && (
          <div className="modal-head">
            <h1>Tambah Data Pasien</h1>
          </div>
        )}
        {type === "medicine" && (
          <div className="modal-head">
            <h1>Tambah Data Obat</h1>
          </div>
        )}
        <div className="modal-body">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <small className="text-danger">{errors.name}</small>}
          {type === "patient" && (
            <>
              <select onChange={(e) => setGender(e.target.value)}>
                <option>Male</option>
                <option>Female</option>
              </select>
              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
              <input
                type="text"
                placeholder="Disease Description"
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
              />
            </>
          )}
          {type === "medicine" && (
            <>
              <input
                type="text"
                placeholder="Type"
                value={medType}
                onChange={(e) => setMedType(e.target.value)}
              />
              <input
                type="text"
                placeholder="Part"
                value={part}
                onChange={(e) => setPart(e.target.value)}
              />
            </>
          )}
          <div className="modal-button row">
            <div className="col-6">
              <button onClick={() => onSubmit()}>
                {loading && (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>&ensp;
                  </>
                )}
                SUBMIT
              </button>
            </div>
            <div className="col-6">
              <button onClick={() => onClose()}>CANCEL</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from "react"
import Index from "../../../Context"
import DelayLink from "react-delay-link"
import useDelayedUnmounting from "../../Utils/useDelayComponent"

export default function Table({
  currentMedicine,
  currentPatient,
  page,
  setPage,
}) {
  const {
    active,
    medicines,
    patients,
    setPatient,
    setMedicine,
  } = React.useContext(Index)

  const [transition, show] = useDelayedUnmounting(13000)
  const delay = 800

  React.useEffect(() => {
    if (page - 1 < 1) return
    else setPage(page - 1)
  }, [patients, medicines])

  const onDelete = (name) => {
    if (active === 1) setPatient(patients.filter((item) => item.name !== name))
    else setMedicine(medicines.filter((item) => item.name !== name))
  }

  return (
    <table>
      <thead>
        <tr>
          <th width="8%">No &emsp;</th>
          {active === 1 && (
            <>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Birthdate</th>
              <th>Disease</th>
            </>
          )}
          {active === 2 && (
            <>
              <th>Name</th>
              <th>Type</th>
              <th>Part</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {active === 1 &&
          currentPatient.length > 0 &&
          currentPatient.map((item) => (
            <tr key={item.no}>
              <td>{item.no}</td>
              <td className="patient">
                <DelayLink clickAction={show} delay={delay} to={item.name}>
                  {item.name}
                </DelayLink>
              </td>
              <td>{item.gender}</td>
              <td>{item.age}</td>
              <td>{item.birthdate}</td>
              <td>{item.disease}</td>
              <td width="8%" onClick={() => onDelete(item.name)}>
                <i className="far fa-trash-alt"></i>
              </td>
            </tr>
          ))}
        {active === 2 &&
          currentMedicine.length > 0 &&
          currentMedicine.map((item) => (
            <tr key={item.no}>
              <td>{item.no}</td>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.part}</td>
              <td width="8%" onClick={() => onDelete(item.name)}>
                <i className="far fa-trash-alt"></i>
              </td>
            </tr>
          ))}
        {active === 1 && patients.length < 1 && (
          <tr>
            <td colSpan="6">
              <h3>data tidak ditemukan ...</h3>
            </td>
          </tr>
        )}
        {active === 2 && medicines.length < 1 && (
          <tr>
            <td colSpan="4">
              <h3>data tidak ditemukan ...</h3>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

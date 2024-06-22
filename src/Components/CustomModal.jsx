import React from 'react'
import "./CustomModal.css"
import { useSelector } from 'react-redux'

const customModal = ({id, showPopup, setShowPopup}) => {

  const allUser = useSelector((state) => {
    return state.app.users
  })
  // console.log(allUser)

  const singleUser = allUser.filter((item) => item.id  === id)
  // console.log(singleUser);

  return (
    <>
        <div className="modalBackground text-center">
            <div className="modalContainer">
            <button onClick={() => setShowPopup(false)}>Close</button>
                <h2>{singleUser[0].name}</h2>
                <h3>{singleUser[0].email}</h3>
                <h4>{singleUser[0].age}</h4>
                <p>{singleUser[0].gender}</p>
            </div>
        </div> 
    </>
  )
}

export default customModal

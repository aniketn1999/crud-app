import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, showUser } from '../features/userDetailSlice'
import CustomModal from './CustomModal'
import { Link } from 'react-router-dom'

const Read = () => {

  const dispatch = useDispatch()

  const [id, setId] = useState('')

  const [showPopup, setShowPopup] = useState(false)
  // console.log(showPopup);

  const [radioData, setRadioData] = useState('')

  const { users, loading, searchData } = useSelector((state) => {
    return state.app
  })
  // console.log(searchData);


  useEffect(() => {
    dispatch(showUser())
  }, []);

  if (loading) {
    return (<h2>Loading...</h2>);
  }


  return (
    <>
      {showPopup && <CustomModal id={id} showPopup={showPopup} setShowPopup={setShowPopup} />}
      <h2 className='text-center'>All Data</h2>
      
      <div className='text-center '>

      <input className="form-check-input" type="radio" name='gender' checked={radioData === ''} onChange={(e) => setRadioData("")}/>
        <label className='form-check-label'>All </label>

        <input className="form-check-input" type="radio" name='gender' value='Male' checked={radioData === 'Male'} onChange={(e) => setRadioData(e.target.value)}/>
        <label className='form-check-label '>Male </label>

        <input className="form-check-input" type="radio" name='gender' value='Female' checked={radioData === 'Female'} onChange={(e) => setRadioData(e.target.value)}/>
        <label className='form-check-label'>Female </label>
        
      </div>

      {users &&

        users.filter((ele) => {
          if (!searchData) {
            return ele;
          } else {
            return ele.name.toLowerCase().includes(searchData.toLowerCase()) || ele.email.toLowerCase().includes(searchData.toLowerCase())

          }
        }).filter((ele) => {
          if(radioData === "Male"){
            return ele.gender === radioData
          }else if(radioData === "Female"){
            return ele.gender === radioData
          }else{
            return ele
          }
        })

          .map((item) => {
            return (
              <div className='text-center ' key={item.id}>
                <div className="card w-50 mx-auto my-2" >
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{item.email}</h6>
                    <p className="card-text">{item.gender}</p>
                    <Link className="card-link" onClick={() => [setId(item.id), setShowPopup(true)]}>View</Link>
                    <Link to={`/edit/${item.id}`} className="card-link">Edit</Link>
                    <Link className="card-link" onClick={() => dispatch(deleteUser(item.id))}>Delete</Link>
                  </div>
                </div>
              </div>
            )
          })
      }
    </>
  )
}

export default Read

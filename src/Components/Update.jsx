import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { updateUser } from '../features/userDetailSlice'

const Update = () => {

    const [updateData, setUpdateData] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { id } = useParams()


    const { loading, users } = useSelector(state => state.app)

    useEffect(() => {

        if (id) {
            const singleUser = users.filter(user => user.id === id)
            setUpdateData(singleUser[0])
        }
    }, [])
    // console.log(updateData);

    const newData = (e) => {
        setUpdateData({ ...updateData, [e.target.name]: e.target.value });
    }
    // console.log(updateData);

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateUser(updateData))
        navigate('/read')
    }


    return (
        <>
            <h2 className="my-2 text-center">Edit the data</h2>
            <form className="w-50 mx-auto my-5" onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name='name'
                        value={updateData && updateData.name}
                        onChange={newData}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name='email'
                        value={updateData && updateData.email}
                        onChange={newData}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                        type="text"
                        name='age'
                        className="form-control"
                        value={updateData && updateData.age}
                        onChange={newData}
                    />
                </div>
                <div className="mb-3">
                    <input
                        className="form-check-input"
                        type="radio"
                        name='gender'
                        value='Male'
                        checked={updateData && updateData.gender === "Male"}
                        onChange={newData}
                    />
                    <label className="form-check-label">Male</label>
                </div>
                <div className="mb-3">
                    <input
                        className="form-check-input"
                        type="radio"
                        name='gender'
                        value='Female'
                        checked={updateData && updateData.gender === "Female"}
                        onChange={newData}
                    />
                    <label className="form-check-label">Female</label>
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    )
}

export default Update

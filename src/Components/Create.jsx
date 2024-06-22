import React from 'react'
import { useState } from 'react'
import { useDispatch } from "react-redux"
import { createUser } from '../features/userDetailSlice'
import { useNavigate } from 'react-router-dom'


const Create = () => {

    const [users, setUsers] = useState({})

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const getUserData = (event) => {
        setUsers({ ...users, [event.target.name]: event.target.value })
        // console.log(users);
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(users);
        dispatch(createUser(users))
        navigate("/read")
    }

    return (
        <>
            <h2 className="my-2 text-center">Fill the data</h2>
            <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name='name'
                        onChange={getUserData}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name='email'
                        onChange={getUserData}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                        type="text"
                        name='age'
                        className="form-control"
                        onChange={getUserData}
                    />
                </div>
                <div className="mb-3">
                    <input
                        className="form-check-input"
                        type="radio"
                        name='gender'
                        value='Male'
                        onChange={getUserData}
                    />
                    <label className="form-check-label">Male</label>
                </div>
                <div className="mb-3">
                    <input
                        className="form-check-input"
                        type="radio"
                        name='gender'
                        value='Female'
                        onChange={getUserData}
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

export default Create

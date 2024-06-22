import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { searchUser } from '../features/userDetailSlice'

const Navbar = () => {

    const dispatch = useDispatch()

    const allData = useSelector(state => state.app.users)

    const [searchData, setSeachData] = useState('')
    // console.log(searchData);
   
    useEffect(() => {
        dispatch(searchUser(searchData))
    }, [searchData])

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" >RTK</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page">Create Post</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/read" className="nav-link active">All Post ({allData.length})</Link>
                            </li>
                        </ul>
                        <form className="d-flex " role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSeachData(e.target.value)} />
                            {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar

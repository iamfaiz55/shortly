import React from 'react'
import { Link } from 'react-router-dom'
import { useLogoutMutation } from '../redux/api\'s/authApi'
import { useSelector } from 'react-redux'


const UserNavbar = () => {
    const [logoutUser] = useLogoutMutation()
    const { user } = useSelector(state => state.auth)
    return <>
        <nav className="navbar navbar-expand-lg bg-primary mb-5 navbar-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Account</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav d-flex">
                        <Link to="/user" className="nav-link active" href="#">Home</Link>
                    </div>
                    <div className="dropdown ms-auto">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                            {user && user.name}
                        </button>
                        <ul className="dropdown-menu">
                            <li><Link to="/user" className="dropdown-item" href="#">Profile</Link></li>
                            <li>
                                <button onClick={e => logoutUser()} className="dropdown-item" >
                                    <i classNameName='bi bi-box-arrow-right'></i> Logout
                                </button>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </>
}

export default UserNavbar
import React from 'react'
import { Link } from 'react-router-dom'
import { useLogoutMutation } from '../redux/api\'s/authApi'

const AdminNavbar = () => {
    const [logoutAdmin] = useLogoutMutation()
    return <>
        <nav className="navbar navbar-expand-lg bg-danger mb-5 navbar-dark">
            <div className="container-fluid">
                <Link to="/admin" className="navbar-brand " href="#">Admin</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to="/admin" className="nav-link active" href="#">Home</Link>
                    </div>
                    <div className="dropdown ms-auto">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                            Admin
                        </button>
                        <ul className="dropdown-menu">
                            <li><Link to='/admin' className="dropdown-item" href="#">Profile</Link></li>
                            <li>
                                <button onClick={logoutAdmin} className="dropdown-item" >
                                    <i className='bi bi-bi-box-arrow-right'></i>Logout
                                </button>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </>
}

export default AdminNavbar